import React from "react";
import { Video } from "@/types";
import Header from "./Header";
import VideoList from "./VideoList";

interface Props {
  videos: Video[];
  selectedVideoId: string | null;
  setSelectedVideoId: (videoId: string) => void;
}

const Sidebar: React.FC<Props> = ({
  videos,
  selectedVideoId,
  setSelectedVideoId,
}) => (
  <div className="order-1 flex flex-col overflow-hidden md:order-0 md:w-1/4 md:min-w-2xs md:border-r md:border-gray-400">
    <Header />
    <VideoList
      videos={videos}
      selectedVideoId={selectedVideoId}
      setSelectedVideoId={setSelectedVideoId}
    />
  </div>
);

export default Sidebar;
