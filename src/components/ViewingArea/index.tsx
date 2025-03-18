import React from "react";
import { Video } from "@/types/video";
import Placeholder from "./Placeholder";
import VideoView from "./VideoView";

interface Props {
  video: Video | null;
}

const ViewingArea: React.FC<Props> = ({ video }) => (
  <div className="flex flex-1 items-center justify-center p-8">
    {video ? <VideoView video={video} /> : <Placeholder />}
  </div>
);

export default ViewingArea;
