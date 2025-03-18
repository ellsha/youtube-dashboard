const calculatePercentage = (value: number, total: number): number => {
  return total ? (value / total) * 100 : 0;
};

export default calculatePercentage;
