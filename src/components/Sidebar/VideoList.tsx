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
    setVisibleVideos((prev) => {
      return [...prev, ...videos.slice(prev.length, prev.length + PAGE_LIMIT)];
    });
  }, [videos]);

  useEffect(() => {
    if (isLoading) {
      loadMoreVideos();
      setIsLoading(false);
    }
  }, [isLoading, loadMoreVideos, setIsLoading]);

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
