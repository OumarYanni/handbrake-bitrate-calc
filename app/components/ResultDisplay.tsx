"use client";

import React, { useState } from "react";
import { Copy, Check, AlertTriangle } from "lucide-react";

interface ResultDisplayProps {
  bitrate: number;
  isTooLowFor4K: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  bitrate,
  isTooLowFor4K,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (bitrate > 0) {
      navigator.clipboard.writeText(bitrate.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-6 pt-2 border-b border-zinc-200/50 mb-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-sm font-medium text-zinc-500">
          Average Bitrate (kbps)
        </span>

        <div className="flex items-center gap-4">
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 tracking-tighter">
            {bitrate > 0 ? bitrate : "---"}
          </div>
          <button
            onClick={handleCopy}
            disabled={bitrate <= 0}
            className="p-3 bg-white border border-border rounded-xl hover:bg-zinc-100 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
            aria-label="Copy bitrate"
          >
            {copied ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <Copy className="w-6 h-6 text-zinc-400 group-hover:text-zinc-600" />
            )}
          </button>
        </div>

        {isTooLowFor4K && bitrate > 0 && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-medium mt-2 animate-pulse">
            <AlertTriangle className="w-4 h-4" />
            <span>Risque de pixellisation en 4K</span>
          </div>
        )}
      </div>
    </div>
  );
};
