"use client";

import { Card } from "@/components/ui/card";
import { useTime } from "@/lib/hooks/useTime";
import { cn } from "@/lib/utils/cn";

export const TimeCard = ({ className }: { className?: string }) => {
    const time = useTime();

    if (!time) {
        return (
            <Card className={cn("flex flex-col justify-center items-center animate-pulse", className)}>
                <div className="h-16 w-32 bg-muted rounded-md mb-2" />
                <div className="h-6 w-48 bg-muted rounded-md" />
            </Card>
        );
    }

    const timeString = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(time);

    const dateString = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(time);

    return (
        <Card className={cn("flex flex-col justify-center items-center text-center backdrop-blur-md bg-card/50 border-white/10", className)}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter tabular-nums text-primary font-mono">
                {timeString}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium mt-2">
                {dateString}
            </p>
        </Card>
    );
};
