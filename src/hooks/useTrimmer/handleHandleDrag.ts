import React from "react";
import { clamp } from "@/helpers/utils";
import { UPDATE_INTERVAL, UseTrimmerHandlersProps } from ".";
import { startDrag } from "./startDrag";

/**
 * Creates a drag handler for the video trimmer handles (left or right)
 *
 * This handler allows users to adjust the start or end of the trimmed section
 * by dragging the corresponding handle
 *
 * @param props - Object containing both player and trimmer properties
 * @param handle - Specifies which handle is being dragged ("left" or "right")
 */
export const handleHandleDrag =
  (
    {
      trimmerRef,
      duration,
      currentTime,
      trimRange,
      setCurrentTime,
      seekTo,
    }: UseTrimmerHandlersProps,
    handle: "left" | "right",
  ) =>
  (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    const container = trimmerRef.current;
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();

    startDrag(e, (clientX) => {
      const positionX = clientX - containerRect.left;
      const clampedX = clamp(positionX, 0, containerRect.width);
      const newPosition = (clampedX / containerRect.width) * duration;

      if (handle === "left" && newPosition < trimRange.end - UPDATE_INTERVAL) {
        trimRange.setStart(newPosition);
        if (currentTime < newPosition) {
          setCurrentTime(newPosition);
          seekTo(newPosition);
        }
      }

      if (
        handle === "right" &&
        newPosition > trimRange.start + UPDATE_INTERVAL
      ) {
        trimRange.setEnd(newPosition);
        if (currentTime > newPosition) {
          setCurrentTime(newPosition);
          seekTo(newPosition);
        }
      }
    });
  };
