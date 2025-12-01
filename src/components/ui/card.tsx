"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, noPadding = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-3xl bg-card text-card-foreground border border-border shadow-sm",
                    "transition-colors duration-200",
                    !noPadding && "p-6",
                    className
                )}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = "Card";
