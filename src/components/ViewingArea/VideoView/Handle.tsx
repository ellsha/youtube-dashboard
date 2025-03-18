import React from "react";

interface HandleProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "onMouseDown" | "onClick"
  > {
  position: "left" | "right";
}

const Handle: React.FC<HandleProps> = ({ position, onMouseDown, onClick }) => (
  <div
    className={`absolute flex h-full w-[10px] cursor-ew-resize items-center justify-center`}
    style={{ [position]: 0 }}
    onMouseDown={onMouseDown}
    onClick={onClick}
  >
    <span className="px-1 text-xs font-bold text-white select-none">||</span>
  </div>
);

export default Handle;
