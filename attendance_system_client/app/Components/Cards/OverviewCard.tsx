import React from "react";

interface OverviewCardProps {
  title: string;
  total: number;
  breakdown?: {
    label: string;
    value: number;
  }[];
  icon?: React.ReactNode;
  iconColor?: string;
}

export default function OverviewCard({
  title,
  total,
  breakdown = [],
  icon,
  iconColor = "blue",
}: OverviewCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{total}</p>
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-full ${colorClasses[iconColor as keyof typeof colorClasses]} flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
      {breakdown.length > 0 && (
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap gap-4">
            {breakdown.map((item, index) => (
              <div key={index} className="flex-1 min-w-[100px]">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

