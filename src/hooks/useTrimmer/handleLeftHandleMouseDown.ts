import React from "react";
import { UseTrimmerHandlersProps } from ".";

export const handleLeftHandleMouseDown =
  ({
    trimmerRef,
    duration,
    currentTime,
    trimmedEnd,
    setCurrentTime,
    setTrimmedStart,
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
      const clampedX = Math.min(Math.max(0, positionX), containerRect.width);
      const newTrimStart = (clampedX / containerRect.width) * duration;
      if (newTrimStart < trimmedEnd - 0.1) {
        setTrimmedStart(newTrimStart);
        if (currentTime < newTrimStart) {
          setCurrentTime(newTrimStart);
          seekTo(newTrimStart);
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
