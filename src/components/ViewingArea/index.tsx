import React from "react";
import Placeholder from "./Placeholder";
import VideoView from "./VideoView";

export interface PrevNextProps {
  handlePrevVideo: () => void;
  handleNextVideo: () => void;
  hasPrevVideo: boolean;
  hasNextVideo: boolean;
}

interface Props extends PrevNextProps {
  videoId: string | null;
}

const ViewingArea: React.FC<Props> = ({ videoId, ...props }) => (
  <div className="flex flex-1 items-center justify-center px-2 py-4 lg:h-screen lg:flex-wrap lg:overflow-y-auto lg:p-6">
    {videoId ? (
      <VideoView key={videoId} videoId={videoId} {...props} />
    ) : (
      <Placeholder />
    )}
  </div>
);

export default ViewingArea;
