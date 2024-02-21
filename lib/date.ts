import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export default function distanceToNow(rawDate: number | Date | string) {
  const date = typeof rawDate === "string" ? new Date(rawDate) : rawDate;
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
}
