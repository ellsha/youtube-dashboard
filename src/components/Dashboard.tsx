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
  const selectedVideo = videos.find(
    (video) => getVideoId(video) === selectedVideoId,
  );

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <Sidebar
        videos={videos}
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
      />
      <ViewingArea video={selectedVideo ?? null} />
    </div>
  );
};

export default Dashboard;
