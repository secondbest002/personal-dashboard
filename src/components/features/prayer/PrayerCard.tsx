"use client";

import { Card } from "@/components/ui/card";
import { usePrayerTimes } from "@/lib/hooks/usePrayerTimes";
import { cn } from "@/lib/utils/cn";
import { Clock } from "lucide-react";

export const PrayerCard = ({ className, lat, lon }: { className?: string; lat?: number; lon?: number }) => {
    // Default to Jakarta if no coords provided
    const { data, nextPrayer, timeToNext, loading, error } = usePrayerTimes(lat ?? -6.2088, lon ?? 106.8456);

    if (loading) {
        return (
            <Card className={cn("p-6 flex flex-col gap-4 animate-pulse backdrop-blur-md bg-card/50 border-white/10", className)}>
                <div className="h-6 w-1/2 bg-muted rounded" />
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-4 w-full bg-muted rounded" />
                    ))}
                </div>
            </Card>
        );
    }

    if (error || !data) {
        return (
            <Card className={cn("p-6 flex items-center justify-center text-destructive backdrop-blur-md bg-card/50 border-white/10", className)}>
                <p>Failed to load prayer times</p>
            </Card>
        );
    }

    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    return (
        <Card className={cn("flex flex-col backdrop-blur-md bg-card/50 border-white/10", className)}>
            <div className="flex items-center justify-between mb-4 p-4 pb-0">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Prayer Times
                </h2>
                {nextPrayer && (
                    <div className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Next: {nextPrayer.name} in {timeToNext}
                    </div>
                )}
            </div>

            <div className="space-y-1 p-4 pt-0">
                {prayers.map((prayer) => {
                    const isNext = nextPrayer?.name === prayer;
                    return (
                        <div
                            key={prayer}
                            className={cn(
                                "flex justify-between items-center p-2 rounded-lg transition-colors",
                                isNext ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-muted-foreground"
                            )}
                        >
                            <span className="text-sm font-medium">{prayer}</span>
                            <span className="text-sm font-mono font-semibold">
                                {data.timings[prayer as keyof typeof data.timings]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
