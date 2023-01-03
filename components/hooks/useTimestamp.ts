// a simple hook to fetch the hour, minute, second, month, day, and year from the current time in UTC for the EST timezone

import { useState, useEffect } from "react";

export function useTimestamp(): {
  date: string;
  isMounted: boolean;
  time: string;
} {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const utc = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      );
      const est = new Date(utc.getTime() + 1000 * 60 * 60 * -5);
      const time = est.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
        minute: "numeric",
        second: "numeric",
        timeZone: "America/New_York",
      });
      const date = est.toLocaleDateString("en-US", {
        // Tuesday, December 1, 2020
        day: "numeric",
        month: "long",
        timeZone: "America/New_York",
        weekday: "long",
      });
      setTime(time);
      setDate(date);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && time && date) {
      setIsMounted(true);
    }
  }, [time, date]);

  return { date, isMounted, time };
}
