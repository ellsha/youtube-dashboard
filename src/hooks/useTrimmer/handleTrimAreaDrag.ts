import React from "react";
import { clamp } from "@/helpers/utils";
import { UseTrimmerHandlersProps } from ".";
import { startDrag } from "./startDrag";

export const handleTrimAreaDrag =
  ({
    trimmedStart,
    trimmedEnd,
    duration,
    setCurrentTime,
    seekTo,
  }: UseTrimmerHandlersProps) =>
  (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const targetRect = e.currentTarget.getBoundingClientRect();
    const isTouchEvent = "touches" in e;

    const initialX = isTouchEvent ? e.touches[0].clientX : e.clientX;

    const updateTime = (clientX: number) => {
      const posX = clientX - targetRect.left;
      const ratio = posX / targetRect.width;
      const newTime = clamp(
        trimmedStart + ratio * (trimmedEnd - trimmedStart),
        0,
        duration,
      );

      setCurrentTime(newTime);
      seekTo(newTime);
    };

    updateTime(initialX);
    startDrag(e, updateTime);
  };
