import React, { useState } from "react";
import Image from "next/image";
import { Video } from "@/types/video";
import imagePlaceholder from "@public/image-placeholder.png";

interface Props {
  video: Video;
  onClick: () => void;
  isSelectedVideo: boolean;
}

const VideoItem: React.FC<Props> = ({ video, onClick, isSelectedVideo }) => {
  const thumbnail = video.snippet.thumbnails.medium;
  const [imageUrl, setImageUrl] = useState<string>(thumbnail.url);

  return (
    <div
      className={`cursor-pointer p-4 ${isSelectedVideo ? "bg-gray-100" : "bg-white"} flex max-w-full items-stretch`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative mr-4 aspect-[16/9] w-32 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={video.snippet.title}
          layout="fill"
          objectFit="cover"
          onError={() => setImageUrl(imagePlaceholder.src)}
        />
      </div>

      {/* Title and description */}
      <div className="flex-1">
        <h3
          className="text-md line-clamp-2 font-semibold break-all"
          title={video.snippet.title}
        >
          {video.snippet.title}
        </h3>
        <p
          className="line-clamp-2 text-sm break-all text-gray-500"
          title={video.snippet.description}
        >
          {video.snippet.description}
        </p>
      </div>
    </div>
  );
};

export default VideoItem;
