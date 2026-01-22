interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface RecentActivitySectionProps {
  activities?: Activity[];
}

const RecentActivitySection = ({ activities = [] }: RecentActivitySectionProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-semibold text-foreground mb-4">
        Recent Activity
      </h3>
      {activities.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity.description}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivitySection;