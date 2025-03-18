import React from "react";
import usePlayer from "@/hooks/usePlayer";
import { Video } from "@/types/video";
import Controls from "./Controls";

interface Props {
  video: Video;
}

const VideoView: React.FC<Props> = ({ video }) => {
  const playerControls = usePlayer(video);

  return (
    <div className="flex w-full flex-col items-center">
      {/*Video player*/}
      <div className="aspect-video w-full">
        <div id="player" className="h-full w-full rounded" />
      </div>

      {/*Toolbar*/}
      <Controls
        isPlaying={playerControls.isPlaying}
        togglePlay={playerControls.togglePlay}
        isMuted={playerControls.isMuted}
        toggleMute={playerControls.toggleMute}
        volume={playerControls.volume}
        handleVolumeChange={playerControls.setVolume}
      />
    </div>
  );
};

export default VideoView;
