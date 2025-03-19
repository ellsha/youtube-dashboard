import React, { useEffect, useState } from "react";
import { search } from "@/helpers/search";
import useDebounce from "@/hooks/useDebounce";
import { Video } from "@/types/video";
import Header from "./Header";
import VideoList from "./VideoList";

interface Props {
  videos: Video[];
  filteredVideos: Video[];
  selectedVideoId: string | null;
  setSelectedVideoId: (videoId: string) => void;
  setFilteredVideos: (videos: Video[]) => void;
}

const Sidebar: React.FC<Props> = ({
  videos,
  filteredVideos,
  selectedVideoId,
  setSelectedVideoId,
  setFilteredVideos,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce((videos: Video[], query: string) => {
    const searchResults = search(videos, query);
    setFilteredVideos(searchResults);
  }, 500);

  useEffect(() => {
    debouncedSearch(videos, searchQuery);
  }, [videos, searchQuery, debouncedSearch]);

  return (
    <div className="relative flex h-screen flex-col border-t-6 border-slate-400 bg-white lg:w-1/4 lg:min-w-2xs lg:border-t-0 lg:border-r-6">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <VideoList
        videos={filteredVideos}
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
      />
      <div className="absolute bottom-0 h-10 w-full shadow-[inset_0px_-15px_15px_-5px_rgba(255,255,255,0.8)]" />
    </div>
  );
};

export default Sidebar;
