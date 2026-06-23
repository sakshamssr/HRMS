const sidebarItems = [
    "Dashboard",
    "Employees",
    "Attendance",
    "Payroll",
    "Recruitment",
    "Performance",
    "Settings",
];

const stats = [
    { label: "Total Employees", value: "248", note: "+12 this month" },
    { label: "Present Today", value: "224", note: "90% attendance rate" },
    { label: "Open Positions", value: "16", note: "5 interviews today" },
    { label: "Pending Leaves", value: "09", note: "3 need approval" },
];

const employees = [
    { name: "Aarav Sharma", role: "HR Manager", department: "Human Resources", status: "Active" },
    { name: "Priya Singh", role: "Recruiter", department: "Talent Acquisition", status: "In Review" },
    { name: "Rohan Mehta", role: "Payroll Executive", department: "Finance", status: "Active" },
    { name: "Sneha Verma", role: "Operations Lead", department: "Operations", status: "On Leave" },
];

function Panel() {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                            H
                        </div>
                        <div>
                            <p className="text-lg font-bold tracking-wide">HRMS Panel</p>
                            <p className="text-sm text-slate-500">Human Resource Management System</p>
                        </div>
                    </div>

                    <div className="hidden flex-1 items-center justify-center md:flex">
                        <div className="flex w-full max-w-md items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                            <svg className="mr-2 h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search employees, payroll, attendance..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                            Notifications
                        </button>
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                AS
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold">Aditi Sharma</p>
                                <p className="text-xs text-slate-500">HR Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
                <aside className="rounded-3xl bg-slate-900 p-5 text-white shadow-xl">
                    <div className="mb-6 rounded-2xl bg-slate-800 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Workspace</p>
                        <h2 className="mt-2 text-xl font-semibold">People Operations</h2>
                        <p className="mt-2 text-sm text-slate-300">Manage hiring, attendance, and payroll from one place.</p>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item, index) => (
                            <button
                                key={item}
                                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                                    index === 0 ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                <span>{item}</span>
                                <span className="text-xs">{index === 0 ? "Live" : "Open"}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-4">
                        <p className="text-sm font-semibold">Monthly HR Goal</p>
                        <p className="mt-2 text-3xl font-bold text-blue-400">82%</p>
                        <p className="mt-2 text-sm text-slate-300">Employee engagement target is on track this month.</p>
                    </div>
                </aside>

                <main className="space-y-6">
                    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">Welcome back</p>
                                <h1 className="mt-1 text-3xl font-bold">HRMS Dashboard Overview</h1>
                                <p className="mt-2 text-sm text-slate-500">Track workforce performance, approvals, and employee activity from this central panel.</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                                    Export Report
                                </button>
                                <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-200">
                                    Add Employee
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {stats.map((card) => (
                            <article key={card.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                                <h3 className="mt-3 text-3xl font-bold text-slate-900">{card.value}</h3>
                                <p className="mt-2 text-sm text-emerald-600">{card.note}</p>
                            </article>
                        ))}
                    </section>

                    <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">Employee Directory</h2>
                                    <p className="text-sm text-slate-500">Quick snapshot of your active HR records.</p>
                                </div>
                                <button className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                                    View All
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-sm text-slate-500">
                                            <th className="pb-3 font-medium">Employee</th>
                                            <th className="pb-3 font-medium">Role</th>
                                            <th className="pb-3 font-medium">Department</th>
                                            <th className="pb-3 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((employee) => (
                                            <tr key={employee.name} className="border-b border-slate-100">
                                                <td className="py-4">
                                                    <div>
                                                        <p className="font-semibold">{employee.name}</p>
                                                        <p className="text-sm text-slate-500">Employee record updated</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm text-slate-600">{employee.role}</td>
                                                <td className="py-4 text-sm text-slate-600">{employee.department}</td>
                                                <td className="py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                            employee.status === "Active"
                                                                ? "bg-emerald-100 text-emerald-700"
                                                                : employee.status === "On Leave"
                                                                ? "bg-amber-100 text-amber-700"
                                                                : "bg-blue-100 text-blue-700"
                                                        }`}
                                                    >
                                                        {employee.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                                <h2 className="text-xl font-bold">Today&apos;s Tasks</h2>
                                <div className="mt-4 space-y-3">
                                    <div className="rounded-2xl bg-slate-50 p-4">
                                        <p className="font-semibold">Approve leave requests</p>
                                        <p className="mt-1 text-sm text-slate-500">3 requests pending manager confirmation.</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-50 p-4">
                                        <p className="font-semibold">Schedule interviews</p>
                                        <p className="mt-1 text-sm text-slate-500">5 candidates are waiting for final slot allocation.</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-50 p-4">
                                        <p className="font-semibold">Payroll preview</p>
                                        <p className="mt-1 text-sm text-slate-500">June salary sheet is ready for review.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-slate-900 p-6 text-white shadow-lg">
                                <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Team Pulse</p>
                                <h2 className="mt-3 text-2xl font-bold">Employee satisfaction is improving.</h2>
                                <p className="mt-3 text-sm text-blue-100">
                                    Feedback responses show better onboarding and faster approval turnaround this quarter.
                                </p>
                                <button className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                                    Review Insights
                                </button>
                            </section>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Panel;
