import { useEffect, useState } from 'react'
import { BOOKSY_WIDGET_ID } from '../constants/links'

/**
 * BooksyWidget Component
 * Encapsulates script loading and DOM management for the Booksy widget.
 * Moves the widget dialog into its overlay for better scrolling and handles closing logic.
 */
const BooksyWidget = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!BOOKSY_WIDGET_ID) return

        // 1. Script Loading
        if (document.querySelector('script[src*="booksy.com/widget/code.js"]')) {
            setIsLoaded(true)
        } else {
            const script = document.createElement('script')
            script.src = `https://booksy.com/widget/code.js?id=${BOOKSY_WIDGET_ID}&country=pl&lang=pl`
            script.async = true
            script.onload = () => setIsLoaded(true)
            document.body.appendChild(script)
        }

        // 2. DOM Management Logic (Closing & Scrolling)
        const handleCloseBooksy = (e) => {
            const isBackdropClick = e.type === 'click' && e.target.classList.contains('booksy-widget-overlay');
            const isEscapePress = e.type === 'keydown' && e.key === 'Escape';

            if (isBackdropClick || isEscapePress) {
                const overlay = document.querySelector('.booksy-widget-overlay');
                const dialog = document.querySelector('.booksy-widget-dialog');
                
                if (overlay || dialog) {
                    overlay?.remove();
                    dialog?.remove();
                    
                    // Restore scrolling immediately
                    document.documentElement.classList.remove('booksy-active');
                    document.body.classList.remove('booksy-active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                }
            }
        };

        // MutationObserver to move dialog into overlay for proper scrolling
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const widgetElementsPresent = !!document.querySelector('.booksy-widget-overlay') || !!document.querySelector('.booksy-widget-dialog');

                if (mutation.addedNodes.length > 0 && widgetElementsPresent) {
                    document.documentElement.classList.add('booksy-active');
                    document.body.classList.add('booksy-active');
                    
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // ELEMENT_NODE
                            if (node.classList.contains('booksy-widget-overlay')) {
                                const dialog = document.querySelector('.booksy-widget-dialog');
                                if (dialog && dialog.parentNode !== node) {
                                    node.appendChild(dialog);
                                }
                            } else if (node.classList.contains('booksy-widget-dialog')) {
                                const overlay = document.querySelector('.booksy-widget-overlay');
                                if (overlay && node.parentNode !== overlay) {
                                    overlay.appendChild(node);
                                }
                            }
                        }
                    });
                }

                if (mutation.removedNodes.length > 0 && !widgetElementsPresent) {
                    document.documentElement.classList.remove('booksy-active');
                    document.body.classList.remove('booksy-active');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                }
            });
        });

        observer.observe(document.body, { childList: true });
        document.addEventListener('click', handleCloseBooksy);
        document.addEventListener('keydown', handleCloseBooksy);

        return () => {
            observer.disconnect();
            document.documentElement.classList.remove('booksy-active');
            document.body.classList.remove('booksy-active');
            document.removeEventListener('click', handleCloseBooksy);
            document.removeEventListener('keydown', handleCloseBooksy);
        };
    }, []);

    return null; // Component only handles logic and DOM side-effects
}

export default BooksyWidget
