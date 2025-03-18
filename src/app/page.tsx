"use client";

import { useState } from "react";
import data from "../../data/data.json";
import { ElementOf } from 'ts-essentials';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const getVideoId = (video: ElementOf<typeof data.items>): string => {
  return video.id.videoId ?? video.id.channelId;
};

export default function Home() {
  const videos = data.items;

  const [selected, setSelected] = useState<string | null>(null);
  const selectedVideo = videos.find((video) => getVideoId(video) === selected);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */ }
      <div className="order-1 flex flex-col md:order-0 md:min-w-2xs md:w-1/4 md:border-r md:border-gray-400">
        {/* Header */ }
        <div className="flex flex-col relative sticky bg-white top-0 w-full p-5 shadow-md shadow-black/5">
          <h2 className="text-xl font-semibold">Video Dashboard</h2>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full pl-10 pr-5 py-2 border border-gray-300 rounded-md"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <MagnifyingGlassIcon className="size-5 text-gray-500" />
            </span>
          </div>
        </div>
        {/* Scrollable video list */ }
        <div className="flex-1 overflow-y-auto">
          { videos.map((video) => {
            const videoId = getVideoId(video);

            return (
              <div
                key={ videoId }
                className={ `p-4 cursor-pointer ${ selected === videoId ? "bg-gray-100" : "bg-white" } flex items-center` }
                onClick={ () => setSelected(videoId) }
              >
                {/* Thumbnail */ }
                <img src={ video.snippet.thumbnails.high.url } className={ "w-36 md:max-lg:w-24 mr-4" }
                     alt={ video.snippet.title }/>
                {/* Title and description */ }
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{ video.snippet.title }</h3>
                  <p className="text-sm text-gray-500">{ video.snippet.description }</p>
                </div>
              </div>
            );
          }) }
        </div>
      </div>
      {/* Main viewing area */ }
      <div className="flex-1 p-8 flex items-center justify-center">
        { selectedVideo === undefined ? (
          // Placeholder
          <div className="text-center text-gray-500">
            To start, please select a video
          </div>
        ) : (
          // Video view
          <div className="flex flex-col items-center h-full">
            {/* Video container */ }
            <div className="w-fit">
              {/* Video player */ }
              <img
                src={ selectedVideo.snippet.thumbnails.high.url }
                alt={ selectedVideo.snippet.title }
                className="w-full h-auto object-contain"
              />

              {/* Controls */ }
              <div className="mt-4 w-full">
                {/* Progress bar */ }
                <div className="w-full h-2 bg-gray-300 rounded-full relative">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 w-[25%]"></div>
                </div>

                {/*TODO implement controls*/ }
              </div>
            </div>
          </div>
        ) }
      </div>
    </div>
  );
}
