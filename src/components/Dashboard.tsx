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

  const selectedIndex = videos.findIndex(
    (video) => getVideoId(video) === selectedVideoId,
  );
  const prevVideo = videos[selectedIndex - 1] || null;
  const selectedVideo = videos[selectedIndex];
  const nextVideo = videos[selectedIndex + 1] || null;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar
        videos={videos}
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
      />
      <ViewingArea
        video={selectedVideo ?? null}
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
    </div>
  );
};

export default Dashboard;
