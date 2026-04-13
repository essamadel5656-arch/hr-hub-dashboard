import { Users, UserCheck, UserMinus, UserPlus, TrendingUp, Clock, Briefcase, DollarSign } from "lucide-react";
import { employees, departmentHeadcount, hiringData, statusBreakdown, recentActivities } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(221,83%,53%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)"];

export default function Dashboard() {
  const active = employees.filter(e => e.status === "Active").length;
  const onLeave = employees.filter(e => e.status === "On Leave").length;
  const newThisMonth = 3;

  const kpis = [
    { label: "Total Employees", value: employees.length, icon: Users, color: "text-primary" },
    { label: "Active", value: active, icon: UserCheck, color: "text-success" },
    { label: "On Leave", value: onLeave, icon: UserMinus, color: "text-warning" },
    { label: "New This Month", value: newThisMonth, icon: UserPlus, color: "text-info" },
  ];

  const activityIcons: Record<string, React.ReactNode> = {
    hire: <Briefcase size={14} />,
    leave: <Clock size={14} />,
    payroll: <DollarSign size={14} />,
    general: <TrendingUp size={14} />,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="kpi-card flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-secondary ${k.color}`}>
              <k.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{k.label}</p>
              <p className="text-2xl font-bold">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Headcount */}
        <div className="kpi-card">
          <h2 className="text-base font-semibold mb-4">Headcount by Department</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentHeadcount}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(221,83%,53%)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring vs Resignations */}
        <div className="kpi-card">
          <h2 className="text-base font-semibold mb-4">Hiring vs Resignations</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={hiringData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hires" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="resignations" stroke="hsl(0,84%,60%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Donut */}
        <div className="kpi-card">
          <h2 className="text-base font-semibold mb-4">Employee Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusBreakdown} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                {statusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="kpi-card lg:col-span-2">
          <h2 className="text-base font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map(a => (
              <div key={a.id} className="flex items-start gap-3 text-sm">
                <div className="mt-0.5 p-1.5 rounded-full bg-secondary text-muted-foreground">{activityIcons[a.type]}</div>
                <div className="flex-1">
                  <p>{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
