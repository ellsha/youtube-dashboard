import React, { useEffect, useRef, useState } from "react";
import { clamp } from "@/helpers/utils";
import usePlayer from "@/hooks/usePlayer";
import useDebounce from "../useDebounce";
import { handleHandleDrag } from "./handleHandleDrag";
import { handleTrimAreaDrag } from "./handleTrimAreaDrag";

type UseTrimmerProps = Pick<
  ReturnType<typeof usePlayer>,
  "seekTo" | "duration" | "togglePlay" | "isPlaying"
> & {
  videoId: string;
};

export type UseTrimmerHandlersProps = Pick<
  UseTrimmerProps,
  "seekTo" | "duration"
> & {
  trimmerRef: React.RefObject<HTMLDivElement | null>;
  currentTime: number;
  trimmedStart: number;
  trimmedEnd: number;
  setCurrentTime: (time: number) => void;
  setTrimmedStart: (time: number) => void;
  setTrimmedEnd: (time: number) => void;
};

// video progress update interval in seconds
export const UPDATE_INTERVAL = 0.1;

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

  const debouncedSaveTrimmedValues = useDebounce(() => {
    localStorage.setItem(trimmedStartKey, JSON.stringify(trimmedStart));
    localStorage.setItem(trimmedEndKey, JSON.stringify(trimmedEnd));
  }, 500);

  // saving the trimmedStart and trimmedEnd to localStorage
  useEffect(() => {
    debouncedSaveTrimmedValues();
  }, [debouncedSaveTrimmedValues]);

  useEffect(() => {
    const updateTime = () => {
      if (isPlaying) {
        // time on the next interval (current time incremented by 0.1s)
        const time = currentTime + UPDATE_INTERVAL;

        setCurrentTime(clamp(time, trimmedStart, trimmedEnd));

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

    const intervalId = setInterval(updateTime, UPDATE_INTERVAL * 1000);

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

  const handlerProps: UseTrimmerHandlersProps = {
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
    handleLeftHandleDrag: handleHandleDrag(handlerProps, "left"),
    handleRightHandleDrag: handleHandleDrag(handlerProps, "right"),
    handleTrimAreaDrag: handleTrimAreaDrag(handlerProps),
  };
};

export default useTrimmer;
