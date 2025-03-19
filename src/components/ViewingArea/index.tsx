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
  <div className="flex h-full flex-1 items-center justify-center p-2 lg:p-8">
    {video ? (
      <VideoView key={getVideoId(video)} video={video} {...props} />
    ) : (
      <Placeholder />
    )}
  </div>
);

export default ViewingArea;
