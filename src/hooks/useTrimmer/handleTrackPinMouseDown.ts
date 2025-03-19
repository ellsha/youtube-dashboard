import React from "react";
import { clamp } from "@/helpers/utils";
import { UseTrimmerHandlersProps } from ".";

export const handleTrackPinMouseDown =
  ({
    trimmerRef,
    duration,
    trimmedStart,
    trimmedEnd,
    setCurrentTime,
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
      const newTimeFromFull = (positionX / containerRect.width) * duration;
      const newTime = clamp(newTimeFromFull, trimmedStart, trimmedEnd);
      setCurrentTime(newTime);
      seekTo(newTime);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
