import React, { useState, useEffect } from "react";
import { search } from "@/helpers/search";
import useDebounce from "@/hooks/useDebounce";
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
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(videos);

  const debouncedSearch = useDebounce((videos: Video[], query: string) => {
    const searchResults = search(videos, query);
    setFilteredVideos(searchResults);
  }, 500);

  useEffect(() => {
    debouncedSearch(videos, searchQuery);
  }, [videos, searchQuery, debouncedSearch]);

  return (
    <div className="order-1 flex flex-col overflow-hidden md:order-0 md:w-1/4 md:min-w-2xs md:border-r md:border-gray-400">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <VideoList
        videos={filteredVideos}
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
      />
    </div>
  );
};

export default Sidebar;
