import React from "react";
import { getVideoId } from "@/helpers/video";
import usePlayer from "@/hooks/usePlayer";
import useTrimmer from "@/hooks/useTrimmer";
import { Video } from "@/types/video";
import Controls from "./Controls";
import Trimmer from "./Trimmer";

interface Props {
  video: Video;
}

const VideoView: React.FC<Props> = ({ video }) => {
  const playerControls = usePlayer(video);
  const trimmerControls = useTrimmer({
    ...playerControls,
    videoId: getVideoId(video),
  });

  return (
    <div className="flex w-full flex-col items-center">
      {/*Video player*/}
      <div className="aspect-video w-full">
        <div id="player" className="h-full w-full rounded" />
      </div>

      {/*Toolbar*/}
      <Controls
        isPlaying={playerControls.isPlaying}
        togglePlay={trimmerControls.safeTogglePlay}
        isMuted={playerControls.isMuted}
        toggleMute={playerControls.toggleMute}
        volume={playerControls.volume}
        handleVolumeChange={playerControls.setVolume}
      />
      <Trimmer
        trimmerRef={trimmerControls.trimmerRef}
        currentTime={trimmerControls.currentTime}
        trimmedStart={trimmerControls.trimmedStart}
        trimmedEnd={trimmerControls.trimmedEnd}
        duration={playerControls.duration}
        handleTrimAreaMouseDown={trimmerControls.handleTrimAreaMouseDown}
        handleTrackPinMouseDown={trimmerControls.handleTrackPinMouseDown}
        handleLeftHandleMouseDown={trimmerControls.handleLeftHandleMouseDown}
        handleRightHandleMouseDown={trimmerControls.handleRightHandleMouseDown}
        seekTo={playerControls.seekTo}
      />
    </div>
  );
};

export default VideoView;
