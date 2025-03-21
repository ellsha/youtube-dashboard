import React from "react";
import { PrevNextProps } from "@/components/ViewingArea";
import { formatTime } from "@/helpers/utils";
import usePlayer from "@/hooks/usePlayer";
import useTrimmer from "@/hooks/useTrimmer";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

type ControlsProps = PrevNextProps &
  Pick<ReturnType<typeof useTrimmer>, "currentTime"> &
  Pick<
    ReturnType<typeof usePlayer>,
    | "isPlaying"
    | "togglePlay"
    | "isMuted"
    | "toggleMute"
    | "volume"
    | "changeVolume"
    | "duration"
  >;

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  togglePlay,
  isMuted,
  toggleMute,
  volume,
  changeVolume,
  handlePrevVideo,
  handleNextVideo,
  hasPrevVideo,
  hasNextVideo,
  currentTime,
  duration,
}) => (
  <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1 lg:w-min lg:gap-10 lg:px-4">
    {/* Left section */}
    <div className="flex items-center gap-1 md:gap-2">
      {/* Previous video button */}
      <button
        onClick={handlePrevVideo}
        disabled={!hasPrevVideo}
        className={`${!hasPrevVideo ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-gray-700 hover:text-gray-900"}`}
      >
        <BackwardIcon className="h-6 w-6" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="cursor-pointer text-gray-700 hover:text-gray-900"
      >
        {isPlaying ? (
          <PauseIcon className="h-8 w-8" />
        ) : (
          <PlayIcon className="h-8 w-8" />
        )}
      </button>

      {/* Next video button */}
      <button
        onClick={handleNextVideo}
        disabled={!hasNextVideo}
        className={`${!hasNextVideo ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-gray-700 hover:text-gray-900"}`}
      >
        <ForwardIcon className="h-6 w-6" />
      </button>
    </div>

    {/* Middle section (Current time / Total time) */}
    <div className="w-40 text-center whitespace-nowrap text-gray-900">
      {formatTime(currentTime)}
      <span className="hidden sm:inline"> / {formatTime(duration)}</span>
    </div>

    {/* Right section (Sound control) */}
    <div className="flex w-22 justify-end space-x-1 lg:w-24 lg:space-x-2">
      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="text-gray-700 hover:text-gray-900"
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="h-6 w-6" />
        ) : (
          <SpeakerWaveIcon className="h-6 w-6" />
        )}
      </button>

      {/* Volume control slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => changeVolume(parseInt(e.target.value))}
        className="hidden accent-blue-500 lg:inline-block lg:w-full"
      />
    </div>
  </div>
);

export default Controls;
