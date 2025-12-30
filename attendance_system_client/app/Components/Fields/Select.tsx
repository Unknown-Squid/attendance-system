import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  error,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className={className.includes("w-") ? "" : "w-full"}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-foreground">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 rounded-lg border ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20"
        } bg-white dark:bg-zinc-900 text-foreground focus:outline-none transition-colors ${
          props.disabled
            ? "opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800"
            : ""
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

