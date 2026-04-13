import { useState } from "react";
import { Search, X } from "lucide-react";
import { employees, type Employee } from "@/data/mockData";

function StatusBadge({ status }: { status: Employee["status"] }) {
  const cls = status === "Active" ? "status-active" : status === "On Leave" ? "status-leave" : "status-inactive";
  return <span className={`status-badge ${cls}`}>{status}</span>;
}

function EmployeeModal({ emp, onClose }: { emp: Employee; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">{emp.avatar}</div>
            <div>
              <h2 className="font-bold text-lg">{emp.name}</h2>
              <p className="text-sm text-muted-foreground">{emp.jobTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
        </div>
        <div className="space-y-3 text-sm">
          {[
            ["ID", emp.id], ["Email", emp.email], ["Phone", emp.phone],
            ["Department", emp.department], ["Start Date", emp.startDate],
            ["Salary", `$${emp.salary.toLocaleString()}`], ["Status", emp.status],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">{l}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Employees() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Employee | null>(null);

  const departments = ["All", ...new Set(employees.map(e => e.department))];
  const statuses = ["All", "Active", "On Leave", "Inactive"];

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || e.department === deptFilter;
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Employees</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search by name or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="px-3 py-2 rounded-lg border border-input bg-card text-sm" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="px-3 py-2 rounded-lg border border-input bg-card text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="kpi-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">ID</th>
              <th className="pb-3 font-medium">Department</th>
              <th className="pb-3 font-medium">Job Title</th>
              <th className="pb-3 font-medium">Start Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => setSelected(emp)}>
                <td className="py-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{emp.avatar}</div>
                  {emp.name}
                </td>
                <td className="py-3 text-muted-foreground">{emp.id}</td>
                <td className="py-3">{emp.department}</td>
                <td className="py-3">{emp.jobTitle}</td>
                <td className="py-3 text-muted-foreground">{emp.startDate}</td>
                <td className="py-3"><StatusBadge status={emp.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No employees found.</p>}
      </div>

      {selected && <EmployeeModal emp={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
