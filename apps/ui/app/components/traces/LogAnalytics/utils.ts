import dayjs from "dayjs";
import numbro from "numbro";

export const formatNumber = (num: number) => {
  return numbro(num).format({
    thousandSeparated: true,
  });
};

export const formatCurrency = (num: number) => {
  return numbro(num).formatCurrency();
};

export const formatDate = (date: string) => {
  return dayjs(date).format("h:mm:ss:SSS a");
};
