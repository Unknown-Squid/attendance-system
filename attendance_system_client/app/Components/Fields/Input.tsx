import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  className = "",
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-foreground">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg border ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-zinc-300 dark:border-zinc-700 focus:border-foreground focus:ring-2 focus:ring-foreground/20"
        } bg-white dark:bg-zinc-900 text-foreground placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none transition-colors ${
          props.disabled
            ? "opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800"
            : props.readOnly
            ? "bg-zinc-50 dark:bg-zinc-800 cursor-default"
            : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

