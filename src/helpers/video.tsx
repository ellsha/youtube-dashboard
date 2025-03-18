import { Video } from "@/types";

export const getVideoId = (video: Video): string => {
  return video.id.videoId ?? video.id.channelId;
};
