import React from "react";
import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

interface ControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  handleVolumeChange: (value: number) => void;
  handlePrevVideo: () => void;
  handleNextVideo: () => void;
  hasPrevVideo: boolean;
  hasNextVideo: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  togglePlay,
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange,
  handlePrevVideo,
  handleNextVideo,
  hasPrevVideo,
  hasNextVideo,
}) => (
  <div className="flex w-1/2 min-w-xs justify-between space-x-4 rounded bg-white px-4 py-2">
    <div className="flex items-center gap-2">
      {/*Previous video*/}
      <button
        onClick={handlePrevVideo}
        disabled={!hasPrevVideo}
        className={`${!hasPrevVideo ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-gray-700 hover:text-gray-900"}`}
      >
        <BackwardIcon className="h-6 w-6" />
      </button>

      {/*Play/pause*/}
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

      {/*Next video*/}
      <button
        onClick={handleNextVideo}
        disabled={!hasNextVideo}
        className={`${!hasNextVideo ? "cursor-not-allowed text-gray-300" : "cursor-pointer text-gray-700 hover:text-gray-900"}`}
      >
        <ForwardIcon className="h-6 w-6" />
      </button>
    </div>

    {/*Sound control*/}
    <div className="flex items-center space-x-2">
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
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
        className="w-24 accent-red-500"
      />
    </div>
  </div>
);

export default Controls;
