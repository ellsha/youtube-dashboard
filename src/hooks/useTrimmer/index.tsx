import React, { useEffect, useRef, useState } from "react";
import { clamp } from "@/helpers/utils";
import usePlayer from "@/hooks/usePlayer";
import { handleHandleDrag } from "./handleHandleDrag";
import { handleTrimAreaDrag } from "./handleTrimAreaDrag";
import useTrimRange, { TrimRange } from "./useTrimRange";

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
  trimRange: TrimRange;
  setCurrentTime: (time: number) => void;
};

// video progress update interval in seconds
export const UPDATE_INTERVAL = 0.1;

/**
 * Hook for managing video trimming functionality
 *
 * It controls the current playback time within a specified trim range,
 * provides handlers for dragging trim handles and trim area, and ensures
 * playback respects the trimmed boundaries
 */
const useTrimmer = ({
  seekTo,
  duration,
  togglePlay,
  isPlaying,
  videoId,
}: UseTrimmerProps) => {
  const trimmerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const trimRange = useTrimRange(videoId, duration);

  useEffect(() => {
    const updateTime = () => {
      if (isPlaying) {
        // time on the next interval (current time incremented by 0.1s)
        const time = currentTime + UPDATE_INTERVAL;

        setCurrentTime(clamp(time, trimRange.start, trimRange.end));

        // the video can only start playing from the trimmedStart
        if (time < trimRange.start) {
          seekTo(trimRange.start);
        }
        // pausing the video at trimmed end
        if (time >= trimRange.end) {
          togglePlay();
        }
      }
    };

    const intervalId = setInterval(updateTime, UPDATE_INTERVAL * 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, trimRange, seekTo, togglePlay, currentTime]);

  // play/pause toggle with boundary reset
  const safeTogglePlay = () => {
    if (!isPlaying && currentTime >= trimRange.end) {
      seekTo(trimRange.start);
      setCurrentTime(trimRange.start);
    }
    togglePlay();
  };

  const handlerProps: UseTrimmerHandlersProps = {
    trimmerRef,
    duration,
    currentTime,
    trimRange,
    setCurrentTime,
    seekTo,
  };

  return {
    trimmerRef,
    currentTime,
    trimmedStart: trimRange.start,
    trimmedEnd: trimRange.end,
    safeTogglePlay,
    handleLeftHandleDrag: handleHandleDrag(handlerProps, "left"),
    handleRightHandleDrag: handleHandleDrag(handlerProps, "right"),
    handleTrimAreaDrag: handleTrimAreaDrag(handlerProps),
  };
};

export default useTrimmer;
