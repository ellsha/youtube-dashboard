import React from "react";
import calculatePercentage from "@/helpers/getPercentage";
import Handle from "./Handle";

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
  const currentPct = Math.min(
    Math.max(calculatePercentage(currentTime, duration), trimStartPct),
    trimStartPct + trimWidthPct,
  );

  return (
    <div className="w-full rounded-md bg-white px-4 py-6">
      <div
        ref={trimmerRef}
        className="relative h-10 w-full rounded bg-gray-300"
      >
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
        </div>
        <div
          className={`absolute top-[-10px] h-full w-[2px] cursor-pointer bg-black`}
          style={{
            left: `${currentPct}%`,
            height: "calc(100% + 20px)",
          }}
          onMouseDown={handleTrackPinMouseDown}
        />
      </div>
    </div>
  );
};

export default Trimmer;
