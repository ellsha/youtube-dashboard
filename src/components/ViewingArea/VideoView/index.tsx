import React from "react";
import Spinner from "@/components/Spinner";
import { getVideoId } from "@/helpers/video";
import usePlayer from "@/hooks/usePlayer";
import useTrimmer from "@/hooks/useTrimmer";
import { Video } from "@/types/video";
import Controls from "./Controls";
import Trimmer from "./Trimmer";

interface Props {
  video: Video;
  handlePrevVideo: () => void;
  handleNextVideo: () => void;
  hasPrevVideo: boolean;
  hasNextVideo: boolean;
}

const VideoView: React.FC<Props> = ({ video, ...videoControlProps }) => {
  const { isLoading, togglePlay, ...playerControls } = usePlayer(video);
  const trimmerControls = useTrimmer({
    ...playerControls,
    togglePlay,
    videoId: getVideoId(video),
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {isLoading && <Spinner />}

      {/*Video player*/}
      <div className={`aspect-video w-full ${isLoading ? "hidden" : ""}`}>
        <div id="player" className="h-full w-full rounded" />
      </div>

      {/*Toolbar*/}
      {!isLoading && (
        <div className="flex w-full flex-col items-center gap-5">
          <Controls
            {...playerControls}
            {...videoControlProps}
            togglePlay={trimmerControls.safeTogglePlay}
          />
          <Trimmer {...trimmerControls} {...playerControls} />
        </div>
      )}
    </div>
  );
};

export default VideoView;
