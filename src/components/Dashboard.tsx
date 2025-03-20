"use client";

import React, { useState } from "react";
import { getVideoId } from "@/helpers/video";
import { Video } from "@/types/video";
import Sidebar from "./Sidebar";
import ViewingArea from "./ViewingArea";

interface Props {
  videos: Video[];
}

const Dashboard: React.FC<Props> = ({ videos }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const selectedIndex = filteredVideos.findIndex(
    (video) => getVideoId(video) === selectedVideoId,
  );
  const prevVideo = filteredVideos[selectedIndex - 1] || null;
  const nextVideo = filteredVideos[selectedIndex + 1] || null;

  return (
    <div className="flex min-w-2xs flex-col overflow-x-hidden lg:min-h-screen lg:flex-row lg:flex-row-reverse">
      <ViewingArea
        videoId={selectedVideoId}
        hasPrevVideo={prevVideo !== null}
        hasNextVideo={nextVideo !== null}
        handlePrevVideo={() => {
          if (prevVideo) {
            setSelectedVideoId(getVideoId(prevVideo));
          }
        }}
        handleNextVideo={() => {
          if (nextVideo) {
            setSelectedVideoId(getVideoId(nextVideo));
          }
        }}
      />
      <Sidebar
        videos={videos}
        filteredVideos={filteredVideos}
        setFilteredVideos={setFilteredVideos}
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
      />
    </div>
  );
};

export default Dashboard;
