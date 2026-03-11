#!/bin/bash

# Update Backlog Statuses
# Logic:
# - Epic Status:
#   - If all features are Done -> Done
#   - Else if all features are Blocked -> Blocked
#   - Else if all features are Cancelled -> Cancelled
#   - Else if any feature status != Backlog -> In progress
#   - Else -> Backlog
# - Milestone Status:
#   - If all epics are Done -> Done
#   - Else if all epics are Blocked -> Blocked
#   - Else if all epics are Cancelled -> Cancelled
#   - Else if any epic status != Backlog -> In progress
#   - Else -> Backlog

BACKLOG_FILE=$(find .specify/backlog -name "*-backlog.md" | head -n 1)

if [ -z "$BACKLOG_FILE" ]; then
  echo "Error: Backlog file not found in .specify/backlog/"
  exit 1
fi

TEMP_FILE=$(mktemp)

# Use awk to process the backlog and update statuses
# This script uses a multi-pass approach or a complex state machine.
# To keep it simple and reliable in shell/awk:
# We'll first extract all features and their statuses, then epics, then milestones.

awk '
BEGIN {
    FS = ": "
    state = "none"
    current_milestone = ""
    current_epic = ""
}

# Identify Milestones
/^### Milestone [0-9]+/ {
    current_milestone = $0
    state = "milestone"
    next
}

# Identify Epics
/^#### Epic [0-9]+/ {
    current_epic = $0
    state = "epic"
    next
}

# Identify Features
/^- \*\*Feature [0-9]+/ {
    current_feature = $0
    state = "feature"
    next
}

# Capture Statuses
/^\*\*Status\*\*: / || /^  \*\*Status\*\*: / {
    sub(/^[ \t]+/, "", $0)
    split($0, parts, ": ")
    status = parts[2]
    
    if (state == "feature") {
        feature_statuses[current_epic] = feature_statuses[current_epic] status ";"
    } else if (state == "epic") {
        epic_statuses[current_milestone] = epic_statuses[current_milestone] status ";"
        epic_line[current_epic] = NR
    } else if (state == "milestone") {
        milestone_line[current_milestone] = NR
    }
}

{ lines[NR] = $0; last_line = NR }

END {
    # Update Epic statuses based on features
    for (epic in feature_statuses) {
        split(feature_statuses[epic], f_list, ";")
        all_done = 1
        all_blocked = 1
        all_cancelled = 1
        any_started = 0
        count = 0
        
        for (i in f_list) {
            s = f_list[i]
            if (s == "") continue
            count++
            if (s != "Done") all_done = 0
            if (s != "Blocked") all_blocked = 0
            if (s != "Cancelled") all_cancelled = 0
            if (s != "Backlog") any_started = 1
        }
        
        new_status = "Backlog"
        if (count > 0) {
            if (all_done) new_status = "Done"
            else if (all_blocked) new_status = "Blocked"
            else if (all_cancelled) new_status = "Cancelled"
            else if (any_started) new_status = "In progress"
        }
        
        # We need to find the status line for this epic
        # The status line is usually the line AFTER the epic header or close to it.
        # Epic header is at lines[epic_line[epic] - 1] (roughly)
        # Actually our parser captured epic_line[current_epic] = NR where status was found.
        if (epic_line[epic]) {
            lines[epic_line[epic]] = "**Status**: " new_status
            # Store for milestone calculation
            epic_final_status[milestone_of_epic(epic)] = epic_final_status[milestone_of_epic(epic)] new_status ";"
        }
    }
    
    # Milestone logic needs to be similar
    # (Simplified for now as the script above already captures epic statuses)
    # Actually wait, the epic_statuses we captured were OLD statuses.
    # We need to use the NEWLY calculated epic statuses.
    
    # Let tokens be passed to map epics to milestones
    # Since we processed linearly, we know which epic belongs to which milestone.
    # But awk hash order is random. 
    # Let resolve this by re-scanning or tracking.
}

# Helper to find milestone of epic
function milestone_of_epic(epic) {
    # This is tricky in one-pass without more state. 
    # Let redo the logic slightly to be more robust.
}
' "$BACKLOG_FILE"

# Re-implementing with a more reliable line-by-line stateful approach
python3 -c "
import re
import sys

def update_backlog(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    milestones = []
    current_m = None
    current_e = None

    # First pass: structure data
    for i, line in enumerate(lines):
        m_match = re.match(r'^### (Milestone \d+: .*)', line)
        if m_match:
            current_m = {'name': m_match.group(1), 'line': i, 'epics': [], 'status_line': -1}
            milestones.append(current_m)
            continue
        
        e_match = re.match(r'^#### (Epic \d+\.\d+: .*)', line)
        if e_match:
            current_e = {'name': e_match.group(1), 'line': i, 'features': [], 'status_line': -1}
            current_m['epics'].append(current_e)
            continue
        
        f_match = re.match(r'^- \*\*(Feature \d+\.\d+\.\d+)\*\*: (.*)', line)
        if f_match:
            current_f = {'name': f_match.group(1), 'line': i, 'status': 'Backlog'}
            current_e['features'].append(current_f)
            # Find feature status in subsequent lines (up to 5 lines ahead)
            for j in range(1, 6):
                if i+j < len(lines):
                    s_match = re.match(r'^[ ]+\*\*Status\*\*: (.*)', lines[i+j])
                    if s_match:
                        current_f['status'] = s_match.group(1).strip()
                        break
            continue

        s_match = re.match(r'^\*\*Status\*\*: (.*)', line)
        if s_match:
            if current_e and current_e['status_line'] == -1:
                current_e['status_line'] = i
            elif current_m and current_m['status_line'] == -1:
                current_m['status_line'] = i

    def get_aggregate_status(statuses):
        if not statuses: return 'Backlog'
        if all(s == 'Done' for s in statuses): return 'Done'
        if all(s == 'Blocked' for s in statuses): return 'Blocked'
        if all(s == 'Cancelled' for s in statuses): return 'Cancelled'
        if any(s != 'Backlog' for s in statuses): return 'In progress'
        return 'Backlog'

    # Second pass: calculate and update
    for m in milestones:
        epic_final_statuses = []
        for e in m['epics']:
            f_statuses = [f['status'] for f in e['features']]
            e['final_status'] = get_aggregate_status(f_statuses)
            epic_final_statuses.append(e['final_status'])
            if e['status_line'] != -1:
                lines[e['status_line']] = f'**Status**: {e[\"final_status\"]}\n'
        
        m['final_status'] = get_aggregate_status(epic_final_statuses)
        if m['status_line'] != -1:
            lines[m['status_line']] = f'**Status**: {m[\"final_status\"]}\n'

    with open(file_path, 'w') as f:
        f.writelines(lines)

update_backlog('$BACKLOG_FILE')
"

echo "Backlog statuses updated in $BACKLOG_FILE"
