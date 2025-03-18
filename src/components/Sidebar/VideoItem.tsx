import React, { useState } from "react";
import Image from "next/image";
import { Video } from "@/types";
import imagePlaceholder from "@public/image-placeholder.png";

interface Props {
  video: Video;
  onClick: () => void;
  isSelectedVideo: boolean;
}

const VideoItem: React.FC<Props> = ({ video, onClick, isSelectedVideo }) => {
  const thumbnail = video.snippet.thumbnails.high;
  const [imageUrl, setImageUrl] = useState<string>(thumbnail.url);

  return (
    <div
      className={`cursor-pointer p-4 ${isSelectedVideo ? "bg-gray-100" : "bg-white"} flex items-center`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <Image
        src={imageUrl}
        alt={video.snippet.title}
        width={thumbnail.width ?? 0}
        height={thumbnail.height ?? 0}
        className="mr-4 w-36 md:max-lg:w-24"
        onError={() => setImageUrl(imagePlaceholder.src)}
      />

      {/* Title and description */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
        <p className="text-sm text-gray-500">{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoItem;
