"use client";

import { motion } from "framer-motion";
import { useFocusStore } from "@/lib/hooks/useFocusMode";
import { cn } from "@/lib/utils/cn";
import { Moon, Sun } from "lucide-react"; // Or Focus icon

export const FocusToggle = ({ className }: { className?: string }) => {
    const { isFocusMode, toggleFocusMode } = useFocusStore();

    return (
        <button
            onClick={toggleFocusMode}
            className={cn(
                "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isFocusMode ? "bg-primary" : "bg-input",
                className
            )}
        >
            <span className="sr-only">Toggle Focus Mode</span>
            <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={cn(
                    "inline-block h-6 w-6 transform rounded-full bg-background shadow-lg ring-0 pointer-events-none flex items-center justify-center"
                )}
                animate={{ x: isFocusMode ? 26 : 4 }}
            >
                {isFocusMode ? (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                ) : (
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                )}
            </motion.span>
        </button>
    );
};
