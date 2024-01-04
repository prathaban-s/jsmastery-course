import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const currentDate = new Date();
  const millisecondsPerMinute = 60 * 1000; // Number of milliseconds in a minute
  const millisecondsPerHour = 60 * millisecondsPerMinute; // Number of milliseconds in an hour
  const millisecondsPerDay = 24 * millisecondsPerHour; // Number of milliseconds in a day

  const differenceInMilliseconds = currentDate.getTime() - createdAt.getTime();

  if (differenceInMilliseconds < millisecondsPerMinute) {
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (differenceInMilliseconds < millisecondsPerHour) {
    const minutes = Math.floor(
      differenceInMilliseconds / millisecondsPerMinute
    );
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (differenceInMilliseconds < millisecondsPerDay) {
    const hours = Math.floor(differenceInMilliseconds / millisecondsPerHour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(differenceInMilliseconds / millisecondsPerDay);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
};

export const convertNumber = (number: number): string => {
  if (number >= 1000000) {
    return Math.floor(number / 1000000) + "m";
  } else if (number >= 1000) {
    return Math.floor(number / 1000) + "k";
  } else {
    return number.toString();
  }
};
