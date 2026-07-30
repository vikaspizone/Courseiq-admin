/**
 * Input component.
 * A reusable, styled input field component for forms.
 */

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative group w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div className="text-zinc-500 group-focus-within:text-blue-400 transition-colors">
            {icon}
          </div>
        </div>
      )}
      <input
        className={`block w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none transition-all duration-300 ${className}`}
        {...props}
      />
    </div>
  );
}
