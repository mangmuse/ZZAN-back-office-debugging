export const getRecentDates = (days: number): string[] => {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

export const getStartDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days + 1);
  return date.toISOString().split("T")[0];
};
