import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook to warn users about unsaved changes when leaving the page
 * @param {boolean} hasUnsavedChanges - Whether there are unsaved changes
 * @param {string} message - Custom warning message
 */
export const useUnsavedChanges = (hasUnsavedChanges, message = 'You have unsaved changes. Do you want to leave without saving?') => {
    useEffect(() => {
        // Warn before closing/refreshing browser tab
        const handleBeforeUnload = (e) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges, message]);
};

/**
 * Hook to block navigation when there are unsaved changes
 * @param {boolean} hasUnsavedChanges - Whether there are unsaved changes
 * @param {string} message - Custom warning message
 */
export const useBlockNavigation = (hasUnsavedChanges, message = 'You have unsaved changes. Do you want to leave without saving?') => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasUnsavedChanges) return;

        // Block navigation in React Router
        const handleClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.href) {
                const shouldLeave = window.confirm(message);
                if (!shouldLeave) {
                    e.preventDefault();
                }
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [hasUnsavedChanges, message, navigate]);
};
