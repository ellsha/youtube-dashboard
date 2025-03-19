import React from "react";
import { formatTime } from "@/helpers/utils";

interface Props {
  position: "left" | "right";
  time: number;
}

const TimeTooltip: React.FC<Props> = ({ position, time }) => (
  <div
    className="lg:text-md absolute top-13 flex items-center justify-center rounded bg-blue-500 px-1 text-sm text-white select-none lg:top-15 lg:px-2"
    style={{
      [position]: 0,
      transform: position === "left" ? "translateX(-50%)" : "translateX(50%)",
    }}
  >
    {/*Small triangle*/}
    <div className="absolute top-[-5px] left-1/2 h-0 w-0 -translate-x-1/2 border-r-[5px] border-b-[5px] border-l-[5px] border-r-transparent border-b-blue-500 border-l-transparent"></div>

    {formatTime(time)}
  </div>
);

export default TimeTooltip;
