import { useEffect, useRef, useState } from "react";
import {
  PlayerEvent,
  PlayerVars,
  StateChangeEvent,
  YTPlayer,
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

/**
 * Hook for managing a YouTube video player using the YouTube IFrame API;
 * It provides functions to
 * - toggle play/pause
 * - mute/unmute
 * - change volume
 * - seek to a specific time
 *
 * @param videoId - YouTube video ID
 * @param playerId - HTML element ID where the YouTube player will be embedded
 */
const usePlayer = (videoId: string, playerId: string) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const createPlayer = () => {
      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        playerVars: PLAYER_VARS,
        events: {
          onReady: (event: PlayerEvent) => {
            setDuration(event.target.getDuration());
            setVolume(event.target.getVolume());
            setIsMuted(event.target.isMuted());
            setIsLoading(false);
          },
          onStateChange: (event: StateChangeEvent) => {
            const status = event.data;

            if (status === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (
              status === window.YT.PlayerState.PAUSED ||
              status === window.YT.PlayerState.ENDED
            ) {
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
  }, [playerId, videoId]);

  const withPlayer = (callback: (player: YTPlayer) => unknown) => {
    if (playerRef.current) {
      callback(playerRef.current);
    }
  };

  return {
    isLoading,
    playerRef,
    isPlaying,
    volume,
    isMuted,
    duration,
    togglePlay: () =>
      withPlayer((player) =>
        isPlaying ? player.pauseVideo() : player.playVideo(),
      ),
    toggleMute: () =>
      withPlayer((player) => {
        if (isMuted) {
          player.unMute();
        } else {
          player.mute();
        }

        setIsMuted(!isMuted);
      }),
    changeVolume: (newVolume: number) =>
      withPlayer((player) => {
        player.setVolume(newVolume);
        setVolume(newVolume);
      }),
    seekTo: (time: number) => withPlayer((player) => player.seekTo(time)),
  };
};

export default usePlayer;
