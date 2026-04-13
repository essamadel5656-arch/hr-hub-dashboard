import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, CalendarCheck, DollarSign, Briefcase,
  ChevronLeft, ChevronRight, Sun, Moon,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/employees", label: "Employees", icon: Users },
  { path: "/attendance", label: "Attendance", icon: CalendarCheck },
  { path: "/payroll", label: "Payroll", icon: DollarSign },
  { path: "/recruitment", label: "Recruitment", icon: Briefcase },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const location = useLocation();

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 bg-sidebar-bg text-sidebar-fg flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-hover">
          {!collapsed && <span className="text-lg font-bold text-primary-foreground tracking-tight">HR System</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-sidebar-hover text-sidebar-fg">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  active
                    ? "bg-sidebar-active text-primary-foreground"
                    : "hover:bg-sidebar-hover text-sidebar-fg"
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-hover">
          <button onClick={toggleDark} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-hover w-full text-sm text-sidebar-fg">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
            {!collapsed && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-60"}`}>
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
