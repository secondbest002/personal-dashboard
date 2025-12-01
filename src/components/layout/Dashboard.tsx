"use client";

import { GridContainer } from "@/components/layout/GridContainer";
import { TimeCard } from "@/components/features/time/TimeCard";
import { PrayerCard } from "@/components/features/prayer/PrayerCard";
import { WeatherCard } from "@/components/features/weather/WeatherCard";
import { QuickCaptureCard } from "@/components/features/capture/QuickCaptureCard";
import { FocusToggle } from "@/components/features/focus/FocusToggle";
import { useFocusStore } from "@/lib/hooks/useFocusMode";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export const Dashboard = () => {
    const { isFocusMode } = useFocusStore();

    const focusClass = isFocusMode ? "opacity-20 blur-sm pointer-events-none grayscale" : "";

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 transition-colors duration-500">
            <div className="w-full max-w-7xl flex justify-end mb-4 px-8">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Focus Mode</span>
                    <FocusToggle />
                </div>
            </div>

            <GridContainer>
                {/* Time & Date: Always visible, but maybe dimmed less? Or kept active? 
            Let's keep Time active in Focus Mode. */}
                <div className="col-span-1 md:col-span-2 row-span-2">
                    <TimeCard className="h-full" />
                </div>

                {/* Prayer Times: Non-essential in Focus Mode? Maybe. Let's dim it. */}
                <div className={cn("col-span-1 row-span-2 transition-all duration-500", focusClass)}>
                    <PrayerCard className="h-full" />
                </div>

                {/* Weather: Non-essential */}
                <div className={cn("col-span-1 row-span-1 transition-all duration-500", focusClass)}>
                    <WeatherCard className="h-full" />
                </div>

                {/* Quick Capture: Essential for brain dump */}
                <div className="col-span-1 md:col-span-2 row-span-1">
                    <QuickCaptureCard className="h-full" />
                </div>

                {/* Placeholder for symmetry or future widget */}
                <div className={cn("col-span-1 row-span-1 transition-all duration-500", focusClass)}>
                    <div className="h-full w-full rounded-3xl bg-muted/20 border border-border/50 flex items-center justify-center text-muted-foreground/20 text-sm font-mono">
                        Empty Slot
                    </div>
                </div>

            </GridContainer>
        </main>
    );
};
