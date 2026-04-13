import { useState } from "react";
import { ChevronLeft, ChevronRight, UserX, Clock, CalendarOff } from "lucide-react";
import { leaveRequests as initialRequests, type LeaveRequest } from "@/data/mockData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Simple random attendance for demo
function getAttendanceStatus(day: number) {
  if (day === 0) return null; // padding
  const r = (day * 7 + 3) % 10;
  if (r < 6) return "present";
  if (r < 8) return "late";
  return "absent";
}

function StatusBadge({ status }: { status: LeaveRequest["status"] }) {
  const cls = status === "approved" ? "status-active" : status === "rejected" ? "status-inactive" : "status-pending";
  return <span className={`status-badge ${cls} capitalize`}>{status}</span>;
}

export default function Attendance() {
  const [requests, setRequests] = useState(initialRequests);
  const [month, setMonth] = useState(3); // April = 3 (0-indexed)
  const [year] = useState(2026);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

  const calendarCells = Array.from({ length: firstDay + daysInMonth }, (_, i) => (i < firstDay ? 0 : i - firstDay + 1));

  const absentToday = 3;
  const lateToday = 2;
  const onLeaveToday = requests.filter(r => r.status === "approved").length;

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, status: action } : r)));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Attendance</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Absent Today", value: absentToday, icon: UserX, color: "text-destructive" },
          { label: "Late Today", value: lateToday, icon: Clock, color: "text-warning" },
          { label: "On Leave Today", value: onLeaveToday, icon: CalendarOff, color: "text-info" },
        ].map(k => (
          <div key={k.label} className="kpi-card flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-secondary ${k.color}`}><k.icon size={22} /></div>
            <div>
              <p className="text-sm text-muted-foreground">{k.label}</p>
              <p className="text-2xl font-bold">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="kpi-card">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMonth(m => Math.max(0, m - 1))} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><ChevronLeft size={18} /></button>
          <h2 className="font-semibold">{monthName}</h2>
          <button onClick={() => setMonth(m => Math.min(11, m + 1))} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><ChevronRight size={18} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {DAYS.map(d => <div key={d} className="py-2 font-medium text-muted-foreground">{d}</div>)}
          {calendarCells.map((day, i) => {
            if (day === 0) return <div key={`e-${i}`} />;
            const status = getAttendanceStatus(day);
            const bg = status === "present" ? "bg-success/15 text-success" : status === "late" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive";
            return (
              <div key={day} className={`py-2 rounded-md text-xs font-medium ${bg}`}>{day}</div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-success" /> Present</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning" /> Late</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Absent</span>
        </div>
      </div>

      {/* Leave requests */}
      <div className="kpi-card">
        <h2 className="text-base font-semibold mb-4">Leave Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Employee</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Dates</th>
                <th className="pb-3 font-medium">Reason</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="py-3">{r.employeeName}</td>
                  <td className="py-3">{r.type}</td>
                  <td className="py-3 text-muted-foreground">{r.startDate} – {r.endDate}</td>
                  <td className="py-3">{r.reason}</td>
                  <td className="py-3"><StatusBadge status={r.status} /></td>
                  <td className="py-3">
                    {r.status === "pending" && (
                      <div className="flex gap-2">
                        <button onClick={() => handleAction(r.id, "approved")} className="px-3 py-1 text-xs font-medium rounded-md bg-success text-success-foreground hover:opacity-90">Approve</button>
                        <button onClick={() => handleAction(r.id, "rejected")} className="px-3 py-1 text-xs font-medium rounded-md bg-destructive text-destructive-foreground hover:opacity-90">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
