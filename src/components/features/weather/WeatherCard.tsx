"use client";

import { Card } from "@/components/ui/card";
import { useWeather } from "@/lib/hooks/useWeather";
import { cn } from "@/lib/utils/cn";
import { Cloud, CloudRain, Sun, CloudFog, CloudSnow, CloudLightning } from "lucide-react";

const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-12 h-12 text-yellow-500" />;
    if (code >= 1 && code <= 3) return <Cloud className="w-12 h-12 text-gray-400" />;
    if (code >= 45 && code <= 48) return <CloudFog className="w-12 h-12 text-gray-400" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-12 h-12 text-blue-400" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-12 h-12 text-blue-200" />;
    if (code >= 95) return <CloudLightning className="w-12 h-12 text-yellow-600" />;
    return <Sun className="w-12 h-12 text-yellow-500" />;
};

const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear Sky";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 95) return "Thunderstorm";
    return "Unknown";
};

export const WeatherCard = ({ className }: { className?: string }) => {
    const { weather, loading } = useWeather();

    if (loading || !weather) {
        return (
            <Card className={cn("flex items-center justify-center animate-pulse", className)}>
                <div className="h-12 w-12 bg-muted rounded-full" />
            </Card>
        );
    }

    return (
        <Card className={cn("flex flex-col items-center justify-center gap-4", className)}>
            {getWeatherIcon(weather.current.weather_code)}
            <div className="text-center">
                <div className="text-4xl font-bold tracking-tighter">
                    {Math.round(weather.current.temperature_2m)}°
                </div>
                <div className="text-muted-foreground font-medium">
                    {getWeatherDescription(weather.current.weather_code)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Jakarta</div>
            </div>
        </Card>
    );
};
