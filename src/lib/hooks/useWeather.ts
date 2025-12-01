"use client";

import { useState, useEffect } from "react";

interface WeatherData {
    current: {
        temperature_2m: number;
        weather_code: number;
    };
}



export function useWeather(lat: number, lon: number) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
                );
                const data = await res.json();
                setWeather(data);
            } catch (error) {
                console.error("Failed to fetch weather", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lon]);

    return { weather, loading };
}
