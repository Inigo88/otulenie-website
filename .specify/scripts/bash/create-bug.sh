#!/usr/bin/env bash

set -e

# Configuration
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
SPECS_DIR="$REPO_ROOT/.specify/bugs"
REGISTRY_FILE="$SPECS_DIR/bug-report.md"
BUG_TEMPLATE="$REPO_ROOT/.specify/templates/bug-template.md"
REGISTRY_TEMPLATE="$REPO_ROOT/.specify/templates/bug-report-template.md"

# Arguments
TITLE=""
FEATURE_ID=""
SHORT_NAME=""

while [ $# -gt 0 ]; do
  case "$1" in
    --feature) FEATURE_ID="$2"; shift 2 ;;
    --short-name) SHORT_NAME="$2"; shift 2 ;;
    *) TITLE="$1"; shift ;;
  esac
done

if [ -z "$TITLE" ]; then
  echo "Usage: $0 \"Bug Title\" [--feature XXX-feature-name] [--short-name slug]"
  exit 1
fi

# 1. Cold Start: Ensure directories and registry exist
mkdir -p "$SPECS_DIR"
if [ ! -f "$REGISTRY_FILE" ]; then
  if [ -f "$REGISTRY_TEMPLATE" ]; then
    cp "$REGISTRY_TEMPLATE" "$REGISTRY_FILE"
    echo "Initialized bug registry from template."
  else
    echo "Error: Registry template not found at $REGISTRY_TEMPLATE"
    exit 1
  fi
fi

# 2. Determine Next Bug ID (BXXX)
# Parse the registry to find the highest BXXX
HIGHEST_ID=$(grep -o "B[0-9]\{3\}" "$REGISTRY_FILE" | sed 's/B//' | sort -rn | head -n 1 || echo "000")
NEXT_ID_NUM=$((10#$HIGHEST_ID + 1))
NEXT_ID=$(printf "B%03d" $NEXT_ID_NUM)

# 3. Handle Feature ID and Directory
if [ -z "$FEATURE_ID" ]; then
  # Default to 000-general if not provided
  FEATURE_ID="000-general"
fi

# Ensure feature ID matches directory naming convention (e.g., 015-footer)
# If it's just a number, try to find the matching directory in specs/
if [[ "$FEATURE_ID" =~ ^[0-9]{3}$ ]]; then
  MATCHING_DIR=$(find "$REPO_ROOT/specs" -maxdepth 1 -type d -name "$FEATURE_ID-*" -exec basename {} \;)
  if [ -n "$MATCHING_DIR" ]; then
    FEATURE_ID="$MATCHING_DIR"
  fi
fi

TARGET_DIR="$SPECS_DIR/$FEATURE_ID"
mkdir -p "$TARGET_DIR"

# 4. Create Bug File
if [ -z "$SHORT_NAME" ]; then
  SHORT_NAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-//' | sed 's/-$//' | cut -c1-50)
fi

BUG_FILENAME="${NEXT_ID}-${SHORT_NAME}.md"
BUG_FILEPATH="$TARGET_DIR/$BUG_FILENAME"
REL_BUG_PATH="${FEATURE_ID}/${BUG_FILENAME}"

if [ -f "$BUG_TEMPLATE" ]; then
  # Replace placeholders in template
  sed "s/BXXX/$NEXT_ID/g; s/\[Title\]/$TITLE/g; s/YYYY-MM-DD/$(date +%Y-%m-%d)/g" "$BUG_TEMPLATE" > "$BUG_FILEPATH"
  echo "Created bug report: $BUG_FILEPATH"
else
  touch "$BUG_FILEPATH"
  echo "Created empty bug report (template missing): $BUG_FILEPATH"
fi

# 5. Update Registry Header (Counts)
# Header format: > **49 total** · ✅ 49 resolved · 🔴 0 open · 🟡 0 fix proposed
TOTAL=$(grep -o "[0-9]\+ total" "$REGISTRY_FILE" | cut -d' ' -f1)
OPEN=$(grep -o "🔴 [0-9]\+ open" "$REGISTRY_FILE" | cut -d' ' -f2)

NEW_TOTAL=$((TOTAL + 1))
NEW_OPEN=$((OPEN + 1))

# Use sed to update the header line
# Note: macOS sed requires different syntax for in-place editing, but we'll try to be compatible or use a temp file
TEMP_REGISTRY=$(mktemp)
sed "s/\*\*$TOTAL total\*\*/\*\*$NEW_TOTAL total\*\*/; s/🔴 $OPEN open/🔴 $NEW_OPEN open/" "$REGISTRY_FILE" > "$TEMP_REGISTRY"

# 6. Append Row to Registry Table
# Find the section for the feature ID, or create it if missing
SECTION_HEADER="## ${FEATURE_ID% -*}" # Simple match for 015-footer or 015
if grep -q "## $FEATURE_ID" "$TEMP_REGISTRY"; then
  # Feature section exists. Find the table end and insert the new row.
  # We look for the line after the table in that section.
  # This is a bit complex for sed, so we'll use a more robust way.
  python3 -c "
import sys
import re

registry_path = '$TEMP_REGISTRY'
feature_id = '$FEATURE_ID'
next_id = '$NEXT_ID'
rel_path = '$REL_BUG_PATH'
title = '$TITLE'

with open(registry_path, 'r') as f:
    lines = f.readlines()

output = []
in_section = False
row_added = False

for i, line in enumerate(lines):
    output.append(line)
    # Match section by starting with ## and then the 3-digit prefix
    if line.startswith('## ' + feature_id[:3]):
        in_section = True
    elif in_section and (line.startswith('## ') or i == len(lines)-1):
        # We reached the next section or EOF. Add the row to the previous section's table.
        # Find the last table row in our section
        for j in range(len(output)-1, 0, -1):
            if '|' in output[j]:
                new_row = f'| [{next_id}]({rel_path}) | {title} | — | 🔴 |\n'
                output.insert(j+1, new_row)
                row_added = True
                break
        in_section = False

if not row_added:
    # Section missing or table missing, append to end
    output.append(f'\n## {feature_id}\n\n')
    output.append('| ID | Title | Fix | Status |\n')
    output.append('|----|-------|-----|--------|\n')
    output.append(f'| [{next_id}]({rel_path}) | {title} | — | 🔴 |\n')

with open(registry_path, 'w') as f:
    f.writelines(output)
"
else
    # Section doesn't exist, append it
    echo -e "\n## $FEATURE_ID\n" >> "$TEMP_REGISTRY"
    echo -e "| ID | Title | Fix | Status |" >> "$TEMP_REGISTRY"
    echo -e "|----|-------|-----|--------|" >> "$TEMP_REGISTRY"
    echo -e "| [$NEXT_ID]($REL_BUG_PATH) | $TITLE | — | 🔴 |" >> "$TEMP_REGISTRY"
fi

mv "$TEMP_REGISTRY" "$REGISTRY_FILE"
echo "Updated registry: $REGISTRY_FILE"

# Output for the agent
if [ -n "$GITHUB_ACTIONS" ]; then
  echo "BUG_ID=$NEXT_ID" >> $GITHUB_OUTPUT
  echo "BUG_FILE=$BUG_FILEPATH" >> $GITHUB_OUTPUT
fi

echo "Success: $NEXT_ID created."
