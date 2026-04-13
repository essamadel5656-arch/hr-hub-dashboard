import { useState, useMemo } from "react";
import { DollarSign, TrendingUp, Download } from "lucide-react";
import { employees } from "@/data/mockData";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState(3); // April

  const payrollData = useMemo(() =>
    employees.filter(e => e.status !== "Inactive").map(e => ({
      ...e,
      netPay: e.salary / 12 + e.bonus - e.deductions,
      monthlySalary: Math.round(e.salary / 12),
    })),
  []);

  const totalPayroll = payrollData.reduce((s, e) => s + e.netPay, 0);
  const avgSalary = totalPayroll / payrollData.length;

  const exportCSV = () => {
    const header = "Name,ID,Department,Base Salary,Bonus,Deductions,Net Pay\n";
    const rows = payrollData.map(e => `${e.name},${e.id},${e.department},${e.monthlySalary},${e.bonus},${e.deductions},${Math.round(e.netPay)}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `payroll_${months[selectedMonth]}_2026.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Payroll</h1>
        <div className="flex gap-3">
          <select className="px-3 py-2 rounded-lg border border-input bg-card text-sm" value={selectedMonth} onChange={e => setSelectedMonth(+e.target.value)}>
            {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="kpi-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-secondary text-primary"><DollarSign size={22} /></div>
          <div>
            <p className="text-sm text-muted-foreground">Total Payroll ({months[selectedMonth]})</p>
            <p className="text-2xl font-bold">${Math.round(totalPayroll).toLocaleString()}</p>
          </div>
        </div>
        <div className="kpi-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-secondary text-success"><TrendingUp size={22} /></div>
          <div>
            <p className="text-sm text-muted-foreground">Average Net Pay</p>
            <p className="text-2xl font-bold">${Math.round(avgSalary).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="kpi-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Department</th>
              <th className="pb-3 font-medium text-right">Base Salary</th>
              <th className="pb-3 font-medium text-right">Bonus</th>
              <th className="pb-3 font-medium text-right">Deductions</th>
              <th className="pb-3 font-medium text-right">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map(e => (
              <tr key={e.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="py-3">{e.name}</td>
                <td className="py-3">{e.department}</td>
                <td className="py-3 text-right">${e.monthlySalary.toLocaleString()}</td>
                <td className="py-3 text-right text-success">${e.bonus.toLocaleString()}</td>
                <td className="py-3 text-right text-destructive">-${e.deductions.toLocaleString()}</td>
                <td className="py-3 text-right font-semibold">${Math.round(e.netPay).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
