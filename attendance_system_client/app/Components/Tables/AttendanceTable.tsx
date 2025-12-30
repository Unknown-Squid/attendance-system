"use client";

import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export interface AttendanceRecord {
  id: string;
  name: string;
  sex: string;
  studentNumber: string;
  date: string;
  time: string;
  qr: string;
  signature: string; // Base64 image data
  status: "present" | "absent" | "late";
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onRemove: (id: string) => void;
  showQr?: boolean;
  showSignature?: boolean;
  showStatus?: boolean;
  showDate?: boolean;
  showTime?: boolean;
}

export default function AttendanceTable({ 
  records, 
  onRemove, 
  showQr = true, 
  showSignature = true, 
  showStatus = true,
  showDate = true,
  showTime = true
}: AttendanceTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "late":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
        <p>No records found</p>
        <p className="text-sm mt-2">Try adjusting your filters or add new records</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Sex</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Student Number</th>
            {showDate && <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>}
            {showTime && <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Time</th>}
            {showQr && <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">QR</th>}
            {showSignature && <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Signature</th>}
            {showStatus && <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>}
            <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-foreground">{record.name}</td>
              <td className="px-4 py-3 text-sm text-foreground capitalize">{record.sex}</td>
              <td className="px-4 py-3 text-sm text-foreground">{record.studentNumber}</td>
              {showDate && <td className="px-4 py-3 text-sm text-foreground">{record.date}</td>}
              {showTime && <td className="px-4 py-3 text-sm text-foreground">{record.time}</td>}
              {showQr && (
                <td className="px-4 py-3 text-sm text-foreground font-mono text-xs">
                  {record.qr ? record.qr.substring(0, 20) + "..." : "N/A"}
                </td>
              )}
              {showSignature && (
                <td className="px-4 py-3">
                  {record.signature ? (
                    <img
                      src={record.signature}
                      alt="Signature"
                      className="w-16 h-10 object-contain border border-zinc-200 dark:border-zinc-700 rounded"
                    />
                  ) : (
                    <span className="text-sm text-zinc-400 dark:text-zinc-600">No signature</span>
                  )}
                </td>
              )}
              {showStatus && (
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </span>
                </td>
              )}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onRemove(record.id)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                  title="Remove Entry"
                >
                  <DeleteIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

