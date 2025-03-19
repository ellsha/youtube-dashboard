import React from "react";

export const startDrag = (
  e: React.MouseEvent | React.TouchEvent,
  onMove: (clientX: number) => void,
) => {
  e.preventDefault();
  const isTouchEvent = "touches" in e;

  const mouseMoveHandler = (ev: MouseEvent) => {
    onMove(ev.clientX);
  };
  const touchMoveHandler = (ev: TouchEvent) => {
    if (ev.touches.length > 0) {
      onMove(ev.touches[0].clientX);
    }
  };

  const endHandler = () => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", endHandler);
    document.removeEventListener("touchmove", touchMoveHandler);
    document.removeEventListener("touchend", endHandler);
  };

  if (isTouchEvent) {
    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("touchend", endHandler);
  } else {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", endHandler);
  }
};
