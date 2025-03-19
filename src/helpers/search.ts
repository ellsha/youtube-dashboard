import { Video } from "@/types/video";

export const search = (videos: Video[], searchString: string) => {
  const trimmedSearchString = searchString.trim();

  if (trimmedSearchString === "") {
    return videos;
  }

  return videos.filter(
    ({ snippet: { title, description } }) =>
      title.toLowerCase().includes(trimmedSearchString.toLowerCase()) ||
      description.toLowerCase().includes(trimmedSearchString.toLowerCase()),
  );
};
