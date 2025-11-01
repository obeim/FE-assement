import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-400/10 rounded-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full  bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
