"use client";

import { useState, useEffect } from "react";
import { PrayerData, PrayerResponse } from "@/lib/types/prayer";

const CITY = "Jakarta";
const COUNTRY = "Indonesia";

export function usePrayerTimes() {
    const [data, setData] = useState<PrayerData | null>(null);
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: Date } | null>(null);
    const [timeToNext, setTimeToNext] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const res = await fetch(
                    `https://api.aladhan.com/v1/timingsByCity?city=${CITY}&country=${COUNTRY}&method=2`
                );
                if (!res.ok) throw new Error("Failed to fetch prayer times");
                const json: PrayerResponse = await res.json();
                setData(json.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchPrayerTimes();
    }, []);

    useEffect(() => {
        if (!data) return;

        const calculateNextPrayer = () => {
            const now = new Date();
            const timings = data.timings;
            const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

            let upcoming = null;

            for (const name of prayerNames) {
                const timeStr = timings[name as keyof typeof timings];
                const [hours, minutes] = timeStr.split(":").map(Number);
                const prayerTime = new Date(now);
                prayerTime.setHours(hours, minutes, 0, 0);

                if (prayerTime > now) {
                    upcoming = { name, time: prayerTime };
                    break;
                }
            }

            // If no upcoming prayer today, it's Fajr tomorrow
            if (!upcoming) {
                const timeStr = timings.Fajr;
                const [hours, minutes] = timeStr.split(":").map(Number);
                const prayerTime = new Date(now);
                prayerTime.setDate(prayerTime.getDate() + 1);
                prayerTime.setHours(hours, minutes, 0, 0);
                upcoming = { name: "Fajr", time: prayerTime };
            }

            setNextPrayer(upcoming);

            // Calculate countdown
            const diff = upcoming.time.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeToNext(
                `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        };

        calculateNextPrayer();
        const interval = setInterval(calculateNextPrayer, 1000);

        return () => clearInterval(interval);
    }, [data]);

    return { data, nextPrayer, timeToNext, loading, error };
}
