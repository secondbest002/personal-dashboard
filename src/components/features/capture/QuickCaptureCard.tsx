"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { PenLine, Copy, Download, Check } from "lucide-react";

export const QuickCaptureCard = ({ className }: { className?: string }) => {
    const [note, setNote] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("quick-capture");
        if (saved) setNote(saved);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNote(value);
        localStorage.setItem("quick-capture", value);
    };

    const handleCopy = async () => {
        if (!note) return;
        await navigator.clipboard.writeText(note);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!note) return;
        const blob = new Blob([note], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `quick-capture-${new Date().toISOString().split("T")[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Card className={cn("flex flex-col h-full relative group overflow-hidden", className)}>
            <div className="flex items-center justify-between mb-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <PenLine className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Quick Capture</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-muted rounded-md transition-colors text-xs"
                        title="Copy to Clipboard"
                    >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-1.5 hover:bg-muted rounded-md transition-colors text-xs"
                        title="Download as .txt"
                    >
                        <Download className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
            <textarea
                className="flex-1 w-full bg-transparent resize-none outline-none text-sm md:text-base placeholder:text-muted-foreground/50 font-mono"
                placeholder="Type something..."
                value={note}
                onChange={handleChange}
            />
        </Card>
    );
};
