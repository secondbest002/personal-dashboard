"use client";

import { Card } from "@/components/ui/card";
import { usePrayerTimes } from "@/lib/hooks/usePrayerTimes";
import { cn } from "@/lib/utils/cn";
import { Clock } from "lucide-react";

export const PrayerCard = ({ className }: { className?: string }) => {
    const { data, nextPrayer, timeToNext, loading, error } = usePrayerTimes();

    if (loading) {
        return (
            <Card className={cn("p-6 flex flex-col gap-4 animate-pulse", className)}>
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
            <Card className={cn("p-6 flex items-center justify-center text-destructive", className)}>
                <p>Failed to load prayer times</p>
            </Card>
        );
    }

    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    return (
        <Card className={cn("flex flex-col", className)}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Prayer Times
                </h2>
                {nextPrayer && (
                    <div className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Next: {nextPrayer.name} in {timeToNext}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                {prayers.map((prayer) => {
                    const isNext = nextPrayer?.name === prayer;
                    return (
                        <div
                            key={prayer}
                            className={cn(
                                "flex justify-between items-center p-2 rounded-lg transition-colors",
                                isNext ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            )}
                        >
                            <span className="text-sm font-medium">{prayer}</span>
                            <span className="text-sm font-mono">
                                {data.timings[prayer as keyof typeof data.timings]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
