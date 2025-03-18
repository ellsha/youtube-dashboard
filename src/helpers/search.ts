import { Video } from "@/types";

export const search = (videos: Video[], searchString: string) =>
  searchString.trim() === ""
    ? videos
    : videos.filter(
        ({ snippet: { title, description } }) =>
          title.toLowerCase().includes(searchString.toLowerCase()) ||
          description.toLowerCase().includes(searchString.toLowerCase()),
      );
