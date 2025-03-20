import { useEffect, useRef, useState } from "react";
import { getVideoId } from "@/helpers/video";
import { Video } from "@/types/video";
import {
  PlayerEvent,
  StateChangeEvent,
  YTPlayer,
  PlayerVars,
} from "@/types/youtube";

/**
 * @see https://developers.google.com/youtube/player_parameters
 */
const PLAYER_VARS: PlayerVars = {
  // This parameter specifies whether the initial video will
  // automatically start to play when the player loads
  autoplay: 0,

  // This parameter indicates whether the video player controls
  // are displayed
  controls: 0,

  // Setting the parameter's value to 1 causes the player to not respond
  // to keyboard controls
  disablekb: 1,

  // Setting the parameter's value to 3 causes video annotations
  // to not be shown by default.
  iv_load_policy: 3,
};

const usePlayer = (video: Video, playerId: string) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const createPlayer = () => {
      playerRef.current = new window.YT.Player(playerId, {
        videoId: getVideoId(video),
        playerVars: PLAYER_VARS,
        events: {
          onReady: (event: PlayerEvent) => {
            setDuration(event.target.getDuration());
            setVolume(event.target.getVolume());
            setIsMuted(event.target.isMuted());
            setIsLoading(false);
          },
          onStateChange: (event: StateChangeEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode?.insertBefore(tag, firstScript);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => playerRef.current?.destroy();
  }, [playerId, video]);

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!playerRef.current) {
      return;
    }

    playerRef.current.setVolume(newVolume);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    if (!playerRef.current) {
      return;
    }

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const seekTo = (time: number) => {
    playerRef.current?.seekTo(time);
  };

  return {
    isLoading,
    playerRef,
    isPlaying,
    volume,
    isMuted,
    duration,
    togglePlay,
    handleVolumeChange,
    toggleMute,
    seekTo,
  };
};

export default usePlayer;
