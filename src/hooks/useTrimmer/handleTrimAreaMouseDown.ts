import React from "react";
import { UseTrimmerHandlersProps } from ".";

export const handleTrimAreaMouseDown =
  ({
    trimmedStart,
    trimmedEnd,
    setCurrentTime,
    seekTo,
  }: UseTrimmerHandlersProps) =>
  (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const targetRect = e.currentTarget.getBoundingClientRect();

    const onMouseMove = (moveEvent: MouseEvent) => {
      const positionX = moveEvent.clientX - targetRect.left;
      const ratio = positionX / targetRect.width;
      const newTime = trimmedStart + ratio * (trimmedEnd - trimmedStart);
      setCurrentTime(newTime);
      seekTo(newTime);
    };

    const positionX = e.clientX - targetRect.left;
    const ratio = positionX / targetRect.width;
    const newTime = trimmedStart + ratio * (trimmedEnd - trimmedStart);
    setCurrentTime(newTime);
    seekTo(newTime);

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
