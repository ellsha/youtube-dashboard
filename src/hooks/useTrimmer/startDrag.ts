import React from "react";

/**
 * Initiates a drag operation using both mouse and touch events,
 * calling the provided `onMove` callback with the current clientX position
 * as the user moves the mouse cursor or touch point
 *
 * @param e  - Initiating event
 * @param onMove - Function to call with the clientX position during the drag
 */
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
