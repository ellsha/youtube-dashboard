import React from "react";
import Spinner from "@/components/Spinner";
import { PrevNextProps } from "@/components/ViewingArea";
import { getVideoId } from "@/helpers/video";
import usePlayer from "@/hooks/usePlayer";
import useTrimmer from "@/hooks/useTrimmer";
import { Video } from "@/types/video";
import Controls from "./Controls";
import Trimmer from "./Trimmer";

interface Props extends PrevNextProps {
  video: Video;
}

const VideoView: React.FC<Props> = ({ video, ...videoControlProps }) => {
  const { isLoading, togglePlay, ...playerControls } = usePlayer(video);
  const trimmerControls = useTrimmer({
    ...playerControls,
    togglePlay,
    videoId: getVideoId(video),
  });

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 lg:gap-4">
      {/*using relative&absolute centering and opacity-0 instead of hidden*/}
      {/*to keep constant the height on the block*/}
      {/*and avoid creating jumping of the height on small screens*/}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/*Video player*/}
      <div className={`${isLoading ? "opacity-0" : "opacity-100"} w-max`}>
        <div id="player" className="aspect-[16/9] h-auto w-full rounded-md" />
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
