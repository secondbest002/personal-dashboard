import React from "react";
import { cn } from "@/lib/utils/cn";

interface GridContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const GridContainer = ({ children, className }: GridContainerProps) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4 max-w-7xl mx-auto p-4 md:p-8",
                className
            )}
        >
            {children}
        </div>
    );
};
