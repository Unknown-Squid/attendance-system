import OverviewCard from "@/app/Components/Cards/OverviewCard";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import React from "react";
import { DashboardStats } from "@/app/ApiClient/dashboard/dashboard";

interface StatCardConfig {
  title: string;
  total: number;
  breakdown: {
    label: string;
    value: number;
  }[];
  icon: React.ReactNode;
  iconColor: "blue" | "green" | "red" | "purple";
}

interface StatsCardSectionProps {
  stats?: DashboardStats | null;
}

const StatsCardSection = ({ stats }: StatsCardSectionProps) => {
  const statsCards: StatCardConfig[] = [
    {
      title: "Total Students",
      total: stats?.totalStudents || 0,
      breakdown: [
        { label: "Male", value: stats?.totalStudentsByGender.male || 0 },
        { label: "Female", value: stats?.totalStudentsByGender.female || 0 },
      ],
      icon: <PeopleIcon className="w-6 h-6" />,
      iconColor: "blue",
    },
    {
      title: "Total Rooms",
      total: stats?.totalRooms || 0,
      breakdown: [
        { label: "Regular", value: stats?.totalRoomsByType.regular || 0 },
        { label: "Event", value: stats?.totalRoomsByType.event || 0 },
      ],
      icon: <ClassIcon className="w-6 h-6" />,
      iconColor: "purple",
    },
    {
      title: "Attendance",
      total: (stats?.totalAttendance.present || 0) + (stats?.totalAttendance.absent || 0),
      breakdown: [
        { label: "Present", value: stats?.totalAttendance.present || 0 },
        { label: "Absent", value: stats?.totalAttendance.absent || 0 },
      ],
      icon: <EventAvailableIcon className="w-6 h-6" />,
      iconColor: "green",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <OverviewCard
          key={index}
          title={card.title}
          total={card.total}
          breakdown={card.breakdown}
          icon={card.icon}
          iconColor={card.iconColor}
        />
      ))}
    </div>
  );
};

export default StatsCardSection;