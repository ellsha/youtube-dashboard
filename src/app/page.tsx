"use client";

import { useState } from "react";
import { ElementOf } from "ts-essentials";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import data from "../../data/data.json";

const getVideoId = (video: ElementOf<typeof data.items>): string => {
  return video.id.videoId ?? video.id.channelId;
};

export default function Home() {
  const videos = data.items;

  const [selected, setSelected] = useState<string | null>(null);
  const selectedVideo = videos.find((video) => getVideoId(video) === selected);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <div className="order-1 flex flex-col md:order-0 md:w-1/4 md:min-w-2xs md:border-r md:border-gray-400">
        {/* Header */}
        <div className="sticky top-0 flex w-full flex-col bg-white p-5 shadow-md shadow-black/5">
          <h2 className="text-xl font-semibold">Video Dashboard</h2>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full rounded-md border border-gray-300 py-2 pr-5 pl-10"
            />
            <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
              <MagnifyingGlassIcon className="size-5 text-gray-500" />
            </span>
          </div>
        </div>
        {/* Scrollable video list */}
        <div className="flex-1 overflow-y-auto">
          {videos.map((video) => {
            const videoId = getVideoId(video);

            return (
              <div
                key={videoId}
                className={`cursor-pointer p-4 ${selected === videoId ? "bg-gray-100" : "bg-white"} flex items-center`}
                onClick={() => setSelected(videoId)}
              >
                {/* Thumbnail */}
                <img
                  src={video.snippet.thumbnails.high.url}
                  className={"mr-4 w-36 md:max-lg:w-24"}
                  alt={video.snippet.title}
                />
                {/* Title and description */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {video.snippet.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {video.snippet.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Main viewing area */}
      <div className="flex flex-1 items-center justify-center p-8">
        {selectedVideo === undefined ? (
          // Placeholder
          <div className="text-center text-gray-500">
            To start, please select a video
          </div>
        ) : (
          // Video view
          <div className="flex h-full flex-col items-center">
            {/* Video container */}
            <div className="w-fit">
              {/* Video player */}
              <img
                src={selectedVideo.snippet.thumbnails.high.url}
                alt={selectedVideo.snippet.title}
                className="h-auto w-full object-contain"
              />

              {/* Controls */}
              <div className="mt-4 w-full">
                {/* Progress bar */}
                <div className="relative h-2 w-full rounded-full bg-gray-300">
                  <div className="absolute top-0 left-0 h-full w-[25%] bg-blue-500"></div>
                </div>

                {/*TODO implement controls*/}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
