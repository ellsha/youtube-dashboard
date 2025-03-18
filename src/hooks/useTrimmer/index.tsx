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

interface UseTrimmerProps {
  // player props
  seekTo: (time: number) => void;
  duration: number;
  togglePlay: () => void;
  isPlaying: boolean;
  // internal props
  videoId: string;
}

const useTrimmer = ({
  seekTo,
  duration,
  togglePlay,
  isPlaying,
  videoId,
}: UseTrimmerProps) => {
  const trimmerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const trimmedStartKey = `${videoId}:trimmedStart`;
  const trimmedEndKey = `${videoId}:trimmedEnd`;

  // loading the saved trimmedStart and trimmedEnd values from localStorage
  const [trimmedStart, setTrimmedStart] = useState<number>(() => {
    const storedTrimmedStart = localStorage.getItem(trimmedStartKey);
    // fallback to 0 if not found
    return storedTrimmedStart ? parseInt(storedTrimmedStart) : 0;
  });
  const [trimmedEnd, setTrimmedEnd] = useState<number>(() => {
    const storedTrimmedEnd = localStorage.getItem(trimmedEndKey);
    // fallback to duration if not found
    return storedTrimmedEnd ? parseInt(storedTrimmedEnd) : duration;
  });

  // refreshing trimmedEnd when player is loaded
  useEffect(() => {
    if (duration > 0 && trimmedEnd == 0) {
      setTrimmedEnd(duration);
    }
  }, [setTrimmedEnd, duration, trimmedEnd]);

  // saving the trimmedStart and trimmedEnd to localStorage
  useEffect(() => {
    // TODO: debounce
    localStorage.setItem(trimmedStartKey, JSON.stringify(trimmedStart));
    localStorage.setItem(trimmedEndKey, JSON.stringify(trimmedEnd));
  }, [trimmedStart, trimmedEnd, trimmedStartKey, trimmedEndKey]);

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
