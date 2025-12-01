"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { PenLine } from "lucide-react";

export const QuickCaptureCard = ({ className }: { className?: string }) => {
    const [note, setNote] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("quick-capture");
        if (saved) setNote(saved);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNote(value);
        localStorage.setItem("quick-capture", value);
    };

    return (
        <Card className={cn("flex flex-col h-full", className)}>
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                <PenLine className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Quick Capture</span>
            </div>
            <textarea
                className="flex-1 w-full bg-transparent resize-none outline-none text-sm md:text-base placeholder:text-muted-foreground/50"
                placeholder="Type something..."
                value={note}
                onChange={handleChange}
            />
        </Card>
    );
};
