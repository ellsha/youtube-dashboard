import React, { useEffect, useState } from "react";

/**
 * Custom hook for implementing infinite scrolling.
 * It monitors a scrollable container and sets a loading state
 * when a user scrolls near the bottom.
 *
 * @param containerRef - scrollable container
 * @param threshold - percentage 0..1 of the container's total height
 * at which to trigger loading more content
 */
const useInfiniteScroll = (
  containerRef: React.RefObject<HTMLElement | null>,
  threshold: number = 0.9,
) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    // exit early of the scrollable container isn't available
    // (e.g. not yet rendered)
    if (!container) {
      return;
    }

    const onScroll = () => {
      // if already loading, skip to avoid multiple triggers
      if (isLoading) {
        return;
      }

      // scrollHeight - total height of the content
      // clientHeight - visible height of the container
      // scrollTop    - distance scrolled from the top
      const { scrollHeight, clientHeight, scrollTop } = container;

      // trigger loading if a user has scrolled past the threshold point
      if (scrollTop + clientHeight >= scrollHeight * threshold) {
        setIsLoading(true);
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => container.removeEventListener("scroll", onScroll);
  }, [isLoading, containerRef, threshold]);

  return { isLoading, setIsLoading };
};

export default useInfiniteScroll;
