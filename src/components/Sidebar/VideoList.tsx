import React from "react";
import { getVideoId } from "@/helpers/video";
import { Video } from "@/types";
import VideoItem from "./VideoItem";

interface Props {
  videos: Video[];
  selectedVideoId: string | null;
  setSelectedVideoId: (videoId: string) => void;
}

const VideoList: React.FC<Props> = ({
  videos,
  selectedVideoId,
  setSelectedVideoId,
}) => (
  <div className="flex-1 overflow-y-auto">
    {videos.map((video) => {
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
  </div>
);

export default VideoList;
