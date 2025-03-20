import React from "react";
import { clamp } from "@/helpers/utils";
import { UseTrimmerHandlersProps } from ".";
import { startDrag } from "./startDrag";

/**
 * Creates a drag handler for the trimmed area of a video trimmer
 *
 * Allows users to navigate through video by dragging within the trimmed
 * section, updating the playback time based on drag position
 *
 * @param props - Object containing both player and trimmer properties
 */
export const handleTrimAreaDrag =
  ({ trimRange, duration, setCurrentTime, seekTo }: UseTrimmerHandlersProps) =>
  (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const targetRect = e.currentTarget.getBoundingClientRect();
    const isTouchEvent = "touches" in e;

    const initialX = isTouchEvent ? e.touches[0].clientX : e.clientX;

    const updateTime = (clientX: number) => {
      const posX = clientX - targetRect.left;
      const ratio = posX / targetRect.width;
      const newTime = clamp(
        trimRange.start + ratio * (trimRange.end - trimRange.start),
        0,
        duration,
      );

      setCurrentTime(newTime);
      seekTo(newTime);
    };

    updateTime(initialX);
    startDrag(e, updateTime);
  };
