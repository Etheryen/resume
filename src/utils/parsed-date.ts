// Assuming dates are formatted like 2024-09 with year and month only
export const parsedDate = (dateStr: string) => {
  const [year, month] = dateStr.split("-");
  const monthStr = monthNumToStr(parseInt(month!));

  return `${monthStr} ${year}`;
};

const monthNumToStr = (num: number) => {
  const strs = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return strs[num - 1];
};
