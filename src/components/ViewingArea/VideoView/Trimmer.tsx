import React from "react";
import { calculatePercentage, clamp, formatTime } from "@/helpers/utils";
import { ClockIcon } from "@heroicons/react/24/outline";
import Handle from "./Handle";
import TimeTooltip from "./TimeTooltip";

interface TrimmerProps {
  trimmerRef: React.RefObject<HTMLDivElement | null>;
  duration: number;
  currentTime: number;
  trimmedStart: number;
  trimmedEnd: number;
  seekTo: (time: number) => void;
  handleLeftHandleMouseDown: (e: React.MouseEvent) => void;
  handleRightHandleMouseDown: (e: React.MouseEvent) => void;
  handleTrimAreaMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleTrackPinMouseDown: (e: React.MouseEvent) => void;
}

const Trimmer: React.FC<TrimmerProps> = ({
  trimmerRef,
  duration,
  currentTime,
  trimmedStart,
  trimmedEnd,
  seekTo,
  handleLeftHandleMouseDown,
  handleRightHandleMouseDown,
  handleTrimAreaMouseDown,
  handleTrackPinMouseDown,
}) => {
  const trimStartPct = calculatePercentage(trimmedStart, duration);
  const trimWidthPct = calculatePercentage(trimmedEnd - trimmedStart, duration);
  const currentPct = clamp(
    calculatePercentage(currentTime, duration),
    trimStartPct,
    trimStartPct + trimWidthPct,
  );

  return (
    <div className="w-full rounded-md bg-white p-7">
      {/*Progress bar base*/}
      <div
        ref={trimmerRef}
        className="relative h-10 w-full rounded bg-gray-300"
      >
        {/*Trimmed area of the progress bar*/}
        <div
          onMouseDown={handleTrimAreaMouseDown}
          className="absolute h-full rounded bg-gradient-to-r from-blue-400 to-blue-600"
          style={{
            left: `${trimStartPct}%`,
            width: `${trimWidthPct}%`,
          }}
        >
          {/*Left handle*/}
          <Handle
            position="left"
            onMouseDown={handleLeftHandleMouseDown}
            onClick={() => seekTo(trimmedStart)}
          />

          {/*Right handle*/}
          <Handle
            position="right"
            onMouseDown={handleRightHandleMouseDown}
            onClick={() => seekTo(trimmedEnd)}
          />

          {/*Tooltips under handles*/}
          <TimeTooltip position="left" time={trimmedStart} />
          <TimeTooltip position="right" time={trimmedEnd} />

          {/*Trimmed duration*/}
          <div className="absolute top-0 left-[50%] flex -translate-x-1/2 -translate-y-[100%] items-center justify-center px-2 pb-1 text-sm text-gray-800 select-none lg:text-xs">
            <ClockIcon className="mr-1 h-4 w-4 text-blue-500" />
            {formatTime(trimmedEnd - trimmedStart)}
          </div>
        </div>

        {/*Track pin*/}
        <div
          className={`absolute top-[-5px] h-full w-[2px] cursor-pointer bg-gray-900`}
          style={{
            left: `${currentPct}%`,
            height: "calc(100% + 10px)",
          }}
          onMouseDown={handleTrackPinMouseDown}
        />
      </div>
    </div>
  );
};

export default Trimmer;
