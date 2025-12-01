"use client";

import { Card } from "@/components/ui/card";
import { useWeather } from "@/lib/hooks/useWeather";
import { cn } from "@/lib/utils/cn";
import { Cloud, CloudRain, Sun, CloudFog, CloudSnow, CloudLightning } from "lucide-react";

export const WeatherCard = ({ className, lat, lon }: { className?: string; lat?: number; lon?: number }) => {
    // Default to Jakarta if no coords provided
    const { weather, loading } = useWeather(lat ?? -6.2088, lon ?? 106.8456);

    const gradientClass = weather ? getWeatherGradient(weather.current.weather_code) : "bg-card/50";

    return (
        <Card className={cn("flex flex-col justify-between p-6 backdrop-blur-md border-white/10 transition-colors duration-1000", gradientClass, className)}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Weather</span>
                {loading && <span className="text-xs text-muted-foreground animate-pulse">Loading...</span>}
            </div>

            {weather ? (
                <div className="flex flex-col gap-2">
                    <div className="self-start p-2 bg-white/5 rounded-full backdrop-blur-sm">
                        {getWeatherIcon(weather.current.weather_code)}
                    </div>
                    <div>
                        <span className="text-5xl font-bold font-mono tracking-tighter">
                            {Math.round(weather.current.temperature_2m)}°
                        </span>
                        <div className="text-sm text-muted-foreground font-medium mt-1">
                            {getWeatherLabel(weather.current.weather_code)}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-12 w-24 bg-muted/20 rounded animate-pulse" />
            )}
        </Card>
    );
};

function getWeatherGradient(code: number): string {
    if (code === 0) return "bg-amber-500/10 hover:bg-amber-500/20"; // Clear
    if (code >= 1 && code <= 3) return "bg-blue-500/10 hover:bg-blue-500/20"; // Cloudy
    if (code >= 45 && code <= 48) return "bg-gray-500/10 hover:bg-gray-500/20"; // Fog
    if (code >= 51 && code <= 67) return "bg-indigo-500/10 hover:bg-indigo-500/20"; // Rain
    if (code >= 71 && code <= 77) return "bg-cyan-500/10 hover:bg-cyan-500/20"; // Snow
    if (code >= 95) return "bg-yellow-500/10 hover:bg-yellow-500/20"; // Thunder
    return "bg-card/50 hover:bg-card/60";
}

function getWeatherLabel(code: number): string {
    if (code === 0) return "Clear Sky";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Unknown";
}

const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-8 h-8 text-amber-500" />;
    if (code >= 1 && code <= 3) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code >= 45 && code <= 48) return <CloudFog className="w-8 h-8 text-gray-400" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-blue-200" />;
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-yellow-600" />;
    return <Sun className="w-8 h-8 text-amber-500" />;
};
