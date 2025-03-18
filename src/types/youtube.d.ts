export interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
  seekTo: (seconds: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

export interface PlayerEvent {
  target: YTPlayer;
}

export interface StateChangeEvent {
  data: number;
}

export interface PlayerVars {
  autoplay?: 0 | 1;
  controls?: 0 | 1;
  disablekb?: 0 | 1;
  iv_load_policy?: 1 | 3;
}

export interface PlayerOptions {
  videoId?: string;
  playerVars?: PlayerVars;
  events?: {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: StateChangeEvent) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: PlayerOptions) => YTPlayer;
      PlayerState: {
        UNSTARTED: -1;
        ENDED: 0;
        PLAYING: 1;
        PAUSED: 2;
        BUFFERING: 3;
        CUED: 5;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}
