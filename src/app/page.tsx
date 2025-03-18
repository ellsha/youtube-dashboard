"use client";

import { useState } from "react";

const videos = [
  { id: 1, color: "bg-orange-200", title: "Video 1", description: "This is a description for Video 1" },
  { id: 2, color: "bg-purple-200", title: "Video 2", description: "This is a description for Video 2" },
  { id: 3, color: "bg-pink-200", title: "Video 3", description: "This is a description for Video 3" },
  { id: 4, color: "bg-cyan-200", title: "Video 4", description: "This is a description for Video 4" },
  { id: 5, color: "bg-purple-200", title: "Video 5", description: "This is a description for Video 5" },
  { id: 6, color: "bg-amber-200", title: "Video 6", description: "This is a description for Video 6" },
  { id: 7, color: "bg-green-200", title: "Video 7", description: "This is a description for Video 7" },
  { id: 8, color: "bg-lime-200", title: "Video 8", description: "This is a description for Video 8" },
  { id: 9, color: "bg-yellow-200", title: "Video 9", description: "This is a description for Video 9" },
  { id: 10, color: "bg-cyan-200", title: "Video 10", description: "This is a description for Video 10" },
  { id: 11, color: "bg-indigo-200", title: "Video 11", description: "This is a description for Video 11" },
  { id: 12, color: "bg-red-200", title: "Video 12", description: "This is a description for Video 12" },
  { id: 13, color: "bg-pink-200", title: "Video 13", description: "This is a description for Video 13" },
  { id: 14, color: "bg-orange-200", title: "Video 14", description: "This is a description for Video 14" },
  { id: 15, color: "bg-purple-200", title: "Video 15", description: "This is a description for Video 15" },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedVideo = videos.find((video) => video.id === selectedId);

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
              {/*TODO: replace with heroicons*/}
              🔍
            </span>
          </div>
        </div>
        {/* Scrollable video list */ }
        <div className="flex-1 overflow-y-auto">
          { videos.map((video) => (
            <div
              key={ video.id }
              className={ `p-4 cursor-pointer ${ selectedId === video.id ? "bg-gray-100" : "bg-white" } flex items-center` }
              onClick={ () => setSelectedId(video.id) }
            >
              {/* Thumbnail */ }
              <div className={ `aspect-[4/3] w-36 md:max-lg:w-24 mr-4 ${ video.color }` } />
              {/* Title and description */ }
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{ video.title }</h3>
                <p className="text-sm text-gray-500">{ video.description }</p>
              </div>
            </div>
          )) }
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
          // Video block view
          <div
            className={ `aspect-[4/3] w-full max-h-full flex items-center justify-center text-white ${ selectedVideo.color }` }
          >
            { selectedVideo.title }
          </div>
        ) }
      </div>
    </div>
  );
}
