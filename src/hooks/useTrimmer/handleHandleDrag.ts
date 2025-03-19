import React from "react";
import { clamp } from "@/helpers/utils";
import { UPDATE_INTERVAL, UseTrimmerHandlersProps } from ".";
import { startDrag } from "./startDrag";

export const handleHandleDrag =
  (
    {
      trimmerRef,
      duration,
      currentTime,
      trimmedStart,
      trimmedEnd,
      setTrimmedStart,
      setTrimmedEnd,
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

      if (handle === "left" && newPosition < trimmedEnd - UPDATE_INTERVAL) {
        setTrimmedStart(newPosition);
        if (currentTime < newPosition) {
          setCurrentTime(newPosition);
          seekTo(newPosition);
        }
      }

      if (handle === "right" && newPosition > trimmedStart + UPDATE_INTERVAL) {
        setTrimmedEnd(newPosition);
        if (currentTime > newPosition) {
          setCurrentTime(newPosition);
          seekTo(newPosition);
        }
      }
    });
  };
