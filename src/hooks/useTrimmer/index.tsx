import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { handleLeftHandleMouseDown } from "./handleLeftHandleMouseDown";
import { handleRightHandleMouseDown } from "./handleRightHandleMouseDown";
import { handleTrackPinMouseDown } from "./handleTrackPinMouseDown";
import { handleTrimAreaMouseDown } from "./handleTrimAreaMouseDown";

export interface UseTrimmerHandlersProps {
  trimmerRef: React.RefObject<HTMLDivElement | null>;
  duration: number;
  currentTime: number;
  trimmedStart: number;
  trimmedEnd: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  setTrimmedStart: Dispatch<SetStateAction<number>>;
  setTrimmedEnd: Dispatch<SetStateAction<number>>;
  seekTo: (time: number) => void;
}

const useTrimmer = (playerControls: {
  seekTo: (time: number) => void;
  duration: number;
  togglePlay: () => void;
  isPlaying: boolean;
}) => {
  const { seekTo, duration, togglePlay, isPlaying } = playerControls;
  const trimmerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [trimmedStart, setTrimmedStart] = useState(0);
  const [trimmedEnd, setTrimmedEnd] = useState(0);

  useEffect(() => {
    setTrimmedEnd(duration);
  }, [duration]);

  useEffect(() => {
    const updateTime = () => {
      if (isPlaying) {
        // time on the next interval (current time incremented by 100ms)
        const time = currentTime + 0.1;

        // forcing the boundaries [ trimmedStart >= time >= trimmedEnd ]
        setCurrentTime(Math.max(trimmedStart, Math.min(time, trimmedEnd)));

        // the video can only start playing from the trimmedStart
        if (time < trimmedStart) {
          seekTo(trimmedStart);
        }
        // pausing the video at trimmed end
        if (time >= trimmedEnd) {
          togglePlay();
        }
      }
    };

    const intervalId = setInterval(updateTime, 100); // Update every 100ms

    return () => clearInterval(intervalId);
  }, [isPlaying, trimmedStart, trimmedEnd, seekTo, togglePlay, currentTime]);

  // play/pause toggle with boundary reset
  const safeTogglePlay = () => {
    if (!isPlaying && currentTime >= trimmedEnd) {
      seekTo(trimmedStart);
      setCurrentTime(trimmedStart);
    }
    togglePlay();
  };

  const trimmerProps: UseTrimmerHandlersProps = {
    trimmerRef,
    duration,
    currentTime,
    trimmedStart,
    trimmedEnd,
    setCurrentTime,
    setTrimmedStart,
    setTrimmedEnd,
    seekTo,
  };

  return {
    trimmerRef,
    currentTime,
    trimmedStart,
    trimmedEnd,
    safeTogglePlay,
    handleLeftHandleMouseDown: handleLeftHandleMouseDown(trimmerProps),
    handleRightHandleMouseDown: handleRightHandleMouseDown(trimmerProps),
    handleTrimAreaMouseDown: handleTrimAreaMouseDown(trimmerProps),
    handleTrackPinMouseDown: handleTrackPinMouseDown(trimmerProps),
  };
};

export default useTrimmer;
