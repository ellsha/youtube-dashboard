import React from "react";
import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

interface ControlsProps {
  volume: number;
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  handleVolumeChange: (value: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  togglePlay,
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange,
}) => (
  <div className="mt-2 flex w-full justify-between px-4">
    <button onClick={togglePlay} className="text-gray-700 hover:text-gray-900">
      {isPlaying ? (
        <PauseIcon className="h-6 w-6" />
      ) : (
        <PlayIcon className="h-6 w-6" />
      )}
    </button>
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
        onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
        className="w-24 accent-red-500"
      />
    </div>
  </div>
);

export default Controls;
