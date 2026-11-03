import { useIsFetching } from "@tanstack/react-query";

// Thin progress bar fixed at the top of the page. It shows whenever a
// background query is fetching — most importantly right after switching
// language: the UI text flips instantly, and this bar signals that the
// server content is still refreshing until it swaps in.
export const TopLoadingBar = () => {
    const isFetching = useIsFetching();

    if (isFetching === 0) return null;

    return (
        <div className="top-loading-bar rtl:-scale-x-100" aria-hidden="true">
            <div className="top-loading-bar__inner" />
        </div>
    );
};

export default TopLoadingBar;
