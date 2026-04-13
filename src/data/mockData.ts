export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  jobTitle: string;
  salary: number;
  bonus: number;
  deductions: number;
  status: "Active" | "On Leave" | "Inactive";
  startDate: string;
  phone: string;
  avatar: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired";
  appliedDate: string;
  email: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  applicants: number;
}

export interface Activity {
  id: string;
  text: string;
  time: string;
  type: "hire" | "leave" | "payroll" | "general";
}

const firstNames = ["James","Maria","Robert","Sarah","Michael","Emily","David","Jessica","Daniel","Ashley","Christopher","Amanda","Matthew","Stephanie","Andrew","Nicole","Joshua","Elizabeth","Joseph","Jennifer","William","Olivia","Thomas","Sophia","Charles","Isabella","Ryan","Mia","Nathan","Ava"];
const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin"];

const departments = ["Engineering", "Marketing", "HR", "Finance", "Operations"];
const jobTitles: Record<string, string[]> = {
  Engineering: ["Software Engineer", "Senior Developer", "Tech Lead", "DevOps Engineer", "QA Engineer"],
  Marketing: ["Marketing Manager", "Content Strategist", "SEO Specialist", "Brand Designer", "Social Media Manager"],
  HR: ["HR Manager", "Recruiter", "Training Coordinator", "HR Analyst", "Benefits Specialist"],
  Finance: ["Financial Analyst", "Accountant", "Controller", "Payroll Specialist", "Auditor"],
  Operations: ["Operations Manager", "Supply Chain Analyst", "Logistics Coordinator", "Facilities Manager", "Project Manager"],
};

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randBetween(a: number, b: number) { return Math.floor(Math.random() * (b - a + 1)) + a; }

export const employees: Employee[] = Array.from({ length: 25 }, (_, i) => {
  const dept = departments[i % 5];
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  const statuses: Employee["status"][] = ["Active", "Active", "Active", "On Leave", "Inactive"];
  return {
    id: `EMP-${String(i + 1).padStart(3, "0")}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@company.com`,
    department: dept,
    jobTitle: rand(jobTitles[dept]),
    salary: randBetween(45000, 120000),
    bonus: randBetween(0, 8000),
    deductions: randBetween(3000, 12000),
    status: statuses[i % 5],
    startDate: `${2020 + (i % 5)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    phone: `+1 (${randBetween(200, 999)}) ${randBetween(100, 999)}-${randBetween(1000, 9999)}`,
    avatar: `${fn[0]}${ln[0]}`,
  };
});

const months = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"];
export const hiringData = months.map((m) => ({ month: m, hires: randBetween(2, 8), resignations: randBetween(0, 4) }));

export const departmentHeadcount = departments.map((d) => ({
  department: d,
  count: employees.filter((e) => e.department === d).length,
}));

export const statusBreakdown = [
  { status: "Active", count: employees.filter((e) => e.status === "Active").length },
  { status: "On Leave", count: employees.filter((e) => e.status === "On Leave").length },
  { status: "Inactive", count: employees.filter((e) => e.status === "Inactive").length },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "LR-001", employeeId: "EMP-004", employeeName: "Sarah Brown", type: "Vacation", startDate: "2026-04-15", endDate: "2026-04-20", status: "pending", reason: "Family vacation" },
  { id: "LR-002", employeeId: "EMP-009", employeeName: "Daniel Martinez", type: "Sick Leave", startDate: "2026-04-13", endDate: "2026-04-14", status: "pending", reason: "Medical appointment" },
  { id: "LR-003", employeeId: "EMP-014", employeeName: "Stephanie Lopez", type: "Personal", startDate: "2026-04-18", endDate: "2026-04-18", status: "approved", reason: "Personal matters" },
  { id: "LR-004", employeeId: "EMP-019", employeeName: "Nicole Anderson", type: "Vacation", startDate: "2026-04-01", endDate: "2026-04-05", status: "rejected", reason: "Peak period" },
  { id: "LR-005", employeeId: "EMP-002", employeeName: "Maria Johnson", type: "Sick Leave", startDate: "2026-04-10", endDate: "2026-04-11", status: "pending", reason: "Flu" },
];

export const candidates: Candidate[] = [
  { id: "C-001", name: "Alex Turner", position: "Software Engineer", stage: "Applied", appliedDate: "2026-04-10", email: "alex@email.com" },
  { id: "C-002", name: "Priya Sharma", position: "Marketing Manager", stage: "Screening", appliedDate: "2026-04-08", email: "priya@email.com" },
  { id: "C-003", name: "Carlos Mendez", position: "Financial Analyst", stage: "Interview", appliedDate: "2026-04-05", email: "carlos@email.com" },
  { id: "C-004", name: "Lisa Chen", position: "DevOps Engineer", stage: "Offer", appliedDate: "2026-03-28", email: "lisa@email.com" },
  { id: "C-005", name: "Omar Hassan", position: "HR Analyst", stage: "Applied", appliedDate: "2026-04-12", email: "omar@email.com" },
  { id: "C-006", name: "Emma Wilson", position: "QA Engineer", stage: "Screening", appliedDate: "2026-04-07", email: "emma@email.com" },
  { id: "C-007", name: "Raj Patel", position: "Tech Lead", stage: "Interview", appliedDate: "2026-04-02", email: "raj@email.com" },
  { id: "C-008", name: "Sophie Martin", position: "Content Strategist", stage: "Hired", appliedDate: "2026-03-15", email: "sophie@email.com" },
  { id: "C-009", name: "Jake Thompson", position: "Software Engineer", stage: "Applied", appliedDate: "2026-04-11", email: "jake@email.com" },
  { id: "C-010", name: "Nina Kowalski", position: "Operations Manager", stage: "Offer", appliedDate: "2026-03-25", email: "nina@email.com" },
];

export const jobPostings: JobPosting[] = [
  { id: "JP-001", title: "Senior Software Engineer", department: "Engineering", location: "Remote", type: "Full-time", posted: "2026-04-01", applicants: 24 },
  { id: "JP-002", title: "Marketing Manager", department: "Marketing", location: "New York", type: "Full-time", posted: "2026-04-05", applicants: 18 },
  { id: "JP-003", title: "Financial Analyst", department: "Finance", location: "Chicago", type: "Full-time", posted: "2026-04-08", applicants: 12 },
  { id: "JP-004", title: "DevOps Engineer", department: "Engineering", location: "Remote", type: "Contract", posted: "2026-04-10", applicants: 9 },
  { id: "JP-005", title: "HR Coordinator", department: "HR", location: "San Francisco", type: "Full-time", posted: "2026-04-12", applicants: 7 },
];

export const recentActivities: Activity[] = [
  { id: "A-001", text: "Sophie Martin was hired as Content Strategist", time: "2 hours ago", type: "hire" },
  { id: "A-002", text: "Sarah Brown submitted a leave request", time: "3 hours ago", type: "leave" },
  { id: "A-003", text: "March payroll processed successfully", time: "1 day ago", type: "payroll" },
  { id: "A-004", text: "New job posting: Senior Software Engineer", time: "2 days ago", type: "general" },
  { id: "A-005", text: "Daniel Martinez submitted sick leave", time: "2 days ago", type: "leave" },
  { id: "A-006", text: "Lisa Chen received an offer letter", time: "3 days ago", type: "hire" },
  { id: "A-007", text: "April attendance report generated", time: "4 days ago", type: "general" },
];
