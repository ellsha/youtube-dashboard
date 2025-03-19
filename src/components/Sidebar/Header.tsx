import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const Header: React.FC<Props> = ({ searchQuery, setSearchQuery }) => (
  <div className="sticky top-0 z-10 flex w-full flex-col bg-inherit p-5 shadow-md shadow-black/5">
    <h2 className="text-xl font-semibold">Video Dashboard</h2>
    <div className="relative mt-2">
      <input
        type="text"
        placeholder="Search videos..."
        className="w-full rounded-md border border-gray-300 py-2 pr-5 pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
        <MagnifyingGlassIcon className="size-5 text-gray-500" />
      </span>
    </div>
  </div>
);

export default Header;
