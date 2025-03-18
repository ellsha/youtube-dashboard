import React from "react";
import { Video } from "@/types";

interface Props {
  video: Video;
}

const VideoView: React.FC<Props> = ({ video }) => {
  // TODO implement video logic

  return (
    <div className="flex flex-col items-center">
      {/* Video container */}
      <div className="w-fit">
        {/* Video player */}
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          className="h-auto w-full object-contain"
        />

        {/* Controls */}
        <div className="mt-4 w-full">
          {/* Progress bar */}
          <div className="relative h-2 w-full rounded-full bg-gray-300">
            <div className="absolute top-0 left-0 h-full w-[25%] bg-blue-500" />
          </div>

          {/*TODO implement controls*/}
        </div>
      </div>
    </div>
  );
};

export default VideoView;
