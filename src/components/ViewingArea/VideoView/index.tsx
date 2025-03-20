import React from "react";
import Spinner from "@/components/Spinner";
import { PrevNextProps } from "@/components/ViewingArea";
import usePlayer from "@/hooks/usePlayer";
import useTrimmer from "@/hooks/useTrimmer";
import Controls from "./Controls";
import Trimmer from "./Trimmer";

interface Props extends PrevNextProps {
  videoId: string;
}

const PLAYER_ID = "player";

const VideoView: React.FC<Props> = ({ videoId, ...videoControlProps }) => {
  const { isLoading, togglePlay, ...playerControls } = usePlayer(
    videoId,
    PLAYER_ID,
  );
  const trimmerControls = useTrimmer({
    ...playerControls,
    videoId,
    togglePlay,
  });

  return (
    <div className="relative flex min-h-full w-full max-w-5xl flex-col items-center justify-center gap-2 lg:gap-4">
      {/*using relative&absolute centering and opacity-0 instead of hidden*/}
      {/*to keep the height of the block constant*/}
      {/*and avoid creating jumping of the height on small screens*/}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/*Video player*/}
      <div className={`${isLoading ? "opacity-0" : "opacity-100"} w-full`}>
        <div
          id={PLAYER_ID}
          className="aspect-[16/9] h-auto w-full rounded-md"
        />
      </div>

      {/*Toolbar*/}
      <div
        className={`flex w-full flex-col items-center gap-2 lg:gap-4 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <Controls
          {...playerControls}
          {...videoControlProps}
          {...trimmerControls}
          togglePlay={trimmerControls.safeTogglePlay}
        />
        <Trimmer {...trimmerControls} {...playerControls} />
      </div>
    </div>
  );
};

export default VideoView;
