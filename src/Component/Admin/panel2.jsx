import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmployeeData } from "../../Features/Employees/EmployeeSlice";

let baseUrl = import.meta.env.VITE_BASE_URL;

export default function Panel2() {

  let [employeeFormData, setEmployeeFormData] = useState([]);
  let dispatch = useDispatch();
  
  useEffect(()=>{
    axios.get(`${baseUrl}/api/get/employee`).then(()=>{
      let {success, message, data} = res.data;
      // console.log(data)
      setEmployeeFormData(data);
      dispatch(setEmployeeData(data));
    }).catch((error)=>{
      let {success, message} = error.response.data;
      console.log(message)
    })
  },[employeeFormData])

  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-zinc-950 dark:text-slate-100">
      <header className="flex flex-col gap-4 border-b border-transparent bg-white px-6 py-4 shadow-sm transition-colors dark:border-white/10 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-sky-600 px-4 py-3 text-white shadow-sm">
            <span className="text-lg font-semibold">HRMS Admin</span>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
            <button className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white" onClick={()=>{navigate("/admin/dashboard")}}>
              Dashboard
            </button>
            <button className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white" onClick={()=>{navigate("/admin/employees")}}>
              Employees
            </button>
            <button className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            onClick={()=>{navigate("/admin/attendance")}}
            >
              Attendance
            </button>
            <button className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            onClick={()=>{navigate("/admin/payroll")}}
            >
              Payroll
            </button>
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-sky-500/20"
            />
          </div>
          <button
            type="button"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDarkMode}
            onClick={() => setIsDarkMode((currentMode) => !currentMode)}
            className="flex h-11 w-[82px] items-center rounded-full border border-slate-200 bg-slate-50 p-1 shadow-sm transition hover:border-sky-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-sky-500/40"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${
                isDarkMode
                  ? "translate-x-9 bg-sky-500 text-white"
                  : "translate-x-0 bg-white text-amber-500"
              }`}
            >
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </span>
          </button>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2 shadow-sm transition-colors dark:bg-white/5">
            <span className="text-sm font-medium">Admin</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-88px)] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-3xl bg-white p-6 shadow-sm transition-colors dark:bg-zinc-900">
          <h3 className="mb-5 text-base font-semibold text-slate-900 dark:text-slate-100">
            HRMS Menu
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {[
              {lable: "Dashboard", path: "/admin/dashboard"},
              {lable: "Employee Directory", path: "/admin/employees"},
              {lable: "Attendance", path: "/admin/attendance"},
              {lable: "Leave Requests", path: "/admin/leave"},
              {lable: "Payroll", path: "/admin/payroll"},
              {lable: "Performance", path: "/admin/performance"},
              {lable: "Reports", path: "/admin/reports"},
              {lable: "Settings", path: "/admin/settings"},
            ].map((item) => (
              <li
                key={item.lable}
                className="cursor-pointer rounded-2xl px-4 py-3 transition hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                onClick={()=>{
                  navigate(item.path)
                }}
              >
                {item.lable}
              </li>
            ))}
          </ul>
        </aside>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
