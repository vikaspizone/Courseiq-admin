/**
 * Card component.
 * A reusable UI container component with consistent styling.
 */

import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl ${className}`}>
      {children}
    </div>
  );
}
