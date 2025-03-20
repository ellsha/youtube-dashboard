import React, { useCallback, useEffect, useRef, useState } from "react";
import { getVideoId } from "@/helpers/video";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Video } from "@/types/video";
import VideoItem from "./VideoItem";

interface Props {
  videos: Video[];
  selectedVideoId: string | null;
  setSelectedVideoId: (videoId: string) => void;
}

const PAGE_LIMIT = 10;

const VideoList: React.FC<Props> = ({
  videos,
  selectedVideoId,
  setSelectedVideoId,
}) => {
  const [visibleVideos, setVisibleVideos] = useState(
    videos.slice(0, PAGE_LIMIT),
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isLoading, setIsLoading } = useInfiniteScroll(containerRef);

  const loadMoreVideos = useCallback(() => {
    setVisibleVideos((prev) => [
      ...prev,
      ...videos.slice(prev.length, prev.length + PAGE_LIMIT),
    ]);
  }, [videos]);

  useEffect(() => {
    setVisibleVideos(videos.slice(0, PAGE_LIMIT));
  }, [videos]);

  useEffect(() => {
    if (isLoading) {
      loadMoreVideos();
      setIsLoading(false);
    }
  }, [isLoading, loadMoreVideos, setIsLoading]);

  // check if the container is filled after visibleVideos updates
  // this way we can initially load more videos if 10 videos don't occupy
  // all available space
  useEffect(() => {
    if (
      !isLoading &&
      containerRef.current &&
      containerRef.current.scrollHeight <= containerRef.current.clientHeight
    ) {
      setIsLoading(true);
    }
  }, [isLoading, loadMoreVideos, setIsLoading]);

  const prevSelectedVideoId = useRef<string | null>(null);

  // when a user clicks on the "next", the next video might be
  // not visible on the screen;
  // this effect scrolls down if the video is partially or fully off-screen
  // and shows the selected item at the top of the list
  useEffect(() => {
    // only trigger when selected video changes
    if (selectedVideoId === prevSelectedVideoId.current) {
      return;
    }

    prevSelectedVideoId.current = selectedVideoId;

    const container = containerRef.current;
    if (!selectedVideoId || !container) {
      return;
    }

    const videoElement = container.querySelector(
      `[data-video-id="${selectedVideoId}"]`,
    );
    if (!(videoElement instanceof HTMLElement)) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const selectedVideoRect = videoElement.getBoundingClientRect();

    const isFullyVisible =
      selectedVideoRect.top >= containerRect.top &&
      selectedVideoRect.bottom <= containerRect.bottom;

    if (!isFullyVisible) {
      const lastPageVideos = visibleVideos.slice(-PAGE_LIMIT);

      const isSelectedInLastPage = lastPageVideos.some(
        (v) => getVideoId(v) === selectedVideoId,
      );

      if (isSelectedInLastPage) {
        loadMoreVideos();
      }

      const scrollOffset =
        selectedVideoRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  }, [loadMoreVideos, selectedVideoId, visibleVideos]);

  return (
    <div className="flex-1 overflow-y-auto" ref={containerRef}>
      {visibleVideos.length === 0 && (
        <div className="flex w-full justify-center p-8">
          <span className="text-gray-400">Nothing matches your search</span>
        </div>
      )}
      {visibleVideos.map((video) => {
        const videoId = getVideoId(video);

        return (
          <VideoItem
            key={videoId}
            video={video}
            onClick={() => setSelectedVideoId(videoId)}
            isSelectedVideo={videoId === selectedVideoId}
          />
        );
      })}
      {isLoading && <div className="py-4 text-center">Loading...</div>}
    </div>
  );
};

export default VideoList;
