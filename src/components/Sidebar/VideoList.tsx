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
    if (isLoading) {
      loadMoreVideos();
      setIsLoading(false);
    }
  }, [isLoading, loadMoreVideos, setIsLoading]);

  // when user clicks on the "next", the next video might be
  // not visible on the screen;
  // this effect scrolls down if the video is partially or fully off-screen
  useEffect(() => {
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
    const videoRect = videoElement.getBoundingClientRect();

    // only scroll if the video is hidden (fully or partially) at the bottom
    if (videoRect.bottom > containerRect.bottom) {
      videoElement.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [selectedVideoId, videos]);

  return (
    <div className="flex-1 overflow-y-auto" ref={containerRef}>
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
