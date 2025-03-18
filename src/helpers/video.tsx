import { Video } from "@/types/video";

export const getVideoId = (video: Video): string => {
  return video.id.videoId ?? video.id.channelId;
};
