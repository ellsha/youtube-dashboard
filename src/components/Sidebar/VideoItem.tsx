import React, { useState } from "react";
import Image from "next/image";
import { getVideoId } from "@/helpers/video";
import { Video } from "@/types/video";
import imagePlaceholder from "@public/image-placeholder.png";

interface Props {
  video: Video;
  onClick: () => void;
  isSelectedVideo: boolean;
}

const VideoItem: React.FC<Props> = ({ video, onClick, isSelectedVideo }) => {
  const thumbnails = video.snippet.thumbnails;
  const [imageUrl, setImageUrl] = useState<string>(thumbnails.medium.url);
  const fallbackImages = [thumbnails.high.url, thumbnails.default.url];

  // if something is wrong with the image url, looking for a fallback image
  // in case something is wrong with the fallback, repeats the process
  const getFallbackUrl = () =>
    fallbackImages[
      fallbackImages.findIndex((fallback) => fallback === imageUrl) + 1
    ] ?? imagePlaceholder.src;

  return (
    <div
      data-video-id={getVideoId(video)}
      className={`cursor-pointer p-5 ${isSelectedVideo ? "bg-slate-200" : "bg-inherit"} flex max-w-full items-stretch`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative mr-3 aspect-[16/9] w-32 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={video.snippet.title}
          priority
          fill
          sizes="100%"
          className="object-cover"
          onError={() => setImageUrl(getFallbackUrl())}
        />
      </div>

      {/* Title and description */}
      <div className="flex flex-col justify-between gap-1">
        <h3
          className="line-clamp-2 text-sm/4 font-semibold break-all"
          title={video.snippet.title}
        >
          {video.snippet.title}
        </h3>
        <p
          className="line-clamp-3 text-sm/4 break-all text-gray-500"
          title={video.snippet.description}
        >
          {video.snippet.description}
        </p>
      </div>
    </div>
  );
};

export default VideoItem;
