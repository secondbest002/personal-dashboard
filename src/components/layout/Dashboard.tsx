"use client";

import { GridContainer } from "@/components/layout/GridContainer";
import { TimeCard } from "@/components/features/time/TimeCard";
import { PrayerCard } from "@/components/features/prayer/PrayerCard";
import { WeatherCard } from "@/components/features/weather/WeatherCard";
import { QuickCaptureCard } from "@/components/features/capture/QuickCaptureCard";
import { FocusToggle } from "@/components/features/focus/FocusToggle";
import { useFocusStore } from "@/lib/hooks/useFocusMode";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export const Dashboard = () => {
    const { isFocusMode } = useFocusStore();
    const { coordinates } = useGeolocation();

    const focusClass = isFocusMode ? "opacity-20 blur-sm pointer-events-none grayscale" : "";

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 transition-colors duration-500 bg-alive">
            <div className="w-full max-w-7xl flex justify-end mb-4 px-8 relative z-10">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Focus Mode</span>
                    <FocusToggle />
                </div>
            </div>

            <GridContainer>
                {/* Time & Date: Always visible */}
                <div className="col-span-1 md:col-span-2 row-span-2">
                    <TimeCard className="h-full" />
                </div>

                {/* Prayer Times */}
                <div className={cn("col-span-1 row-span-2 transition-all duration-500", focusClass)}>
                    <PrayerCard className="h-full" lat={coordinates?.lat} lon={coordinates?.lon} />
                </div>

                {/* Weather */}
                <div className={cn("col-span-1 row-span-2 transition-all duration-500", focusClass)}>
                    <WeatherCard className="h-full" lat={coordinates?.lat} lon={coordinates?.lon} />
                </div>

                {/* Quick Capture */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 row-span-1">
                    <QuickCaptureCard className="h-full" />
                </div>

            </GridContainer>
        </main>
    );
};
