export const calculatePercentage = (value: number, total: number): number => {
  return total ? (value / total) * 100 : 0;
};

export const formatTime = (seconds: number): string => {
  // round the seconds to avoid precision issues
  const roundedSeconds = Math.floor(seconds);

  const h = Math.floor(roundedSeconds / 3600);
  const m = Math.floor((roundedSeconds % 3600) / 60);
  const s = roundedSeconds % 60;

  return [h, m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
