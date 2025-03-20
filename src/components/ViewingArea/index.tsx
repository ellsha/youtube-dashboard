import React from "react";
import { getVideoId } from "@/helpers/video";
import { Video } from "@/types/video";
import Placeholder from "./Placeholder";
import VideoView from "./VideoView";

export interface PrevNextProps {
  handlePrevVideo: () => void;
  handleNextVideo: () => void;
  hasPrevVideo: boolean;
  hasNextVideo: boolean;
}

interface Props extends PrevNextProps {
  video: Video | null;
}

const ViewingArea: React.FC<Props> = ({ video, ...props }) => (
  <div className="flex flex-1 items-center justify-center px-2 py-4 lg:h-screen lg:flex-wrap lg:overflow-y-auto lg:p-6">
    {video ? (
      <VideoView key={getVideoId(video)} video={video} {...props} />
    ) : (
      <Placeholder />
    )}
  </div>
);

export default ViewingArea;
