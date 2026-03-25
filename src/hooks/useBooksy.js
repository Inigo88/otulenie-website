import { useCallback } from 'react'

/**
 * useBooksy Hook
 * Provides a centralized function to trigger the Booksy booking flow.
 * Handles responsive behavior: direct link on mobile, widget on desktop.
 */
export const useBooksy = () => {
    const triggerBooksy = useCallback((e) => {
        // 1. Check for mobile viewport (< 768px)
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            // On mobile, let the default anchor behavior (href to Booksy) work
            return;
        }

        // 2. Desktop Behavior: Trigger the Booksy widget button
        const booksyBtn = document.querySelector('.booksy-widget-button');
        if (booksyBtn) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            booksyBtn.click();
        }
    }, []);

    return { triggerBooksy };
};

export default useBooksy;
