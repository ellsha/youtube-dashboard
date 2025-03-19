import React from "react";

interface HandleProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    "onMouseDown" | "onTouchStart" | "onClick"
  > {
  position: "left" | "right";
}

const Handle: React.FC<HandleProps> = ({ position, ...divProps }) => (
  <div
    className={`absolute flex h-full w-[10px] cursor-ew-resize items-center justify-center`}
    style={{ [position]: 0 }}
    {...divProps}
  >
    <span className="px-1 text-xs font-extrabold text-white select-none">
      ||
    </span>
  </div>
);

export default Handle;
