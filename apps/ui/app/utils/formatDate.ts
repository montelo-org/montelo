import { TimeFrames } from "~/pages/traces/constants/timeframes";

export const formatDate = (date?: TimeFrames) => {
  const NOW = new Date().getTime();
  const MINUTE = 60 * 1000;
  const DAY = 24 * 60 * MINUTE;

  switch (date) {
    case TimeFrames.LAST_15_MINUTES:
      return new Date(NOW - 15 * MINUTE).toISOString();
    case TimeFrames.LAST_30_MINUTES:
      return new Date(NOW - 30 * MINUTE).toISOString();
    case TimeFrames.LAST_HOUR:
      return new Date(NOW - 60 * MINUTE).toISOString();
    case TimeFrames.LAST_DAY:
      return new Date(NOW - DAY).toISOString();
    case TimeFrames.LAST_3_DAYS:
      return new Date(NOW - 3 * DAY).toISOString();
    case TimeFrames.LAST_7_DAYS:
      return new Date(NOW - 7 * DAY).toISOString();
    case TimeFrames.LAST_30_DAYS:
      return new Date(NOW - 30 * DAY).toISOString();
    case TimeFrames.ALL_TIME:
    default:
      return null;
  }
};
