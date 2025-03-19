import React from "react";
import { clamp } from "@/helpers/utils";
import { UseTrimmerHandlersProps } from ".";

export const handleRightHandleMouseDown =
  ({
    trimmerRef,
    duration,
    currentTime,
    trimmedStart,
    setCurrentTime,
    setTrimmedEnd,
    seekTo,
  }: UseTrimmerHandlersProps) =>
  (e: React.MouseEvent) => {
    e.preventDefault();

    const container = trimmerRef.current;
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();

    const onMouseMove = (moveEvent: MouseEvent) => {
      const positionX = moveEvent.clientX - containerRect.left;
      const clampedX = clamp(positionX, 0, containerRect.width);
      const newTrimEnd = (clampedX / containerRect.width) * duration;

      if (newTrimEnd > trimmedStart + 0.1) {
        setTrimmedEnd(newTrimEnd);
        if (currentTime > newTrimEnd) {
          setCurrentTime(newTrimEnd);
          seekTo(newTrimEnd);
        }
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
