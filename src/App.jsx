
import { lazy, Suspense } from "react";

let Login = lazy(()=>import ("./Component/LoginPage/login"))

import Signup from "./Component/SignUpPage/signup";
import Panel from "./Component/Admin/panel";
import Panel2 from "./Component/Admin/panel2";
import Dashboard from "./Component/Admin/Dashboard";
import Employees from "./Component/Admin/Pages/Employees";
import Attendance from "./Component/Admin/Pages/Attendance";
import Leave from "./Component/Admin/Pages/Leave";
import Payroll from "./Component/Admin/Pages/Payroll";
import Performance from "./Component/Admin/Pages/Performance";
import Reports from "./Component/Admin/Pages/Reports";
import Settings from "./Component/Admin/Pages/Settings";
import RequireAuth from "./Component/RequireAuth";
import EmployeePannel from "./Component/EmployeesPannel/EmployeesPannel";
import EmpDashboard from "./Component/EmployeesPannel/Pages/EmpDashboard";
import EmpProfile from "./Component/EmployeesPannel/Pages/Profile";


import {BrowserRouter, Routes, Route} from "react-router-dom";

function App(){
  return(
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter><Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/admin2" element={<Panel/>}/>
      <Route path="/admin" element={
        <RequireAuth>
          <Panel2/>
        </RequireAuth>
        }>
        <Route index element={<Dashboard/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="employees" element={<Employees/>} />
        <Route path="attendance" element={<Attendance/>} />
        <Route path="leave" element={<Leave/>} />
        <Route path="payroll" element={<Payroll/>} />
        <Route path="performance" element={<Performance/>} />
        <Route path="reports" element={<Reports/>} />
        <Route path="settings" element={<Settings/>} />
      </Route>
      <Route path="/employee" element={<EmployeePannel/>}>
        <Route index element={<EmpDashboard/>}/>   
        <Route path="dashboard" element={<EmpDashboard/>}/>   
        <Route path="profile" element={<EmpProfile/>}/>   
        {/* <Route path="payslip" element={<EmpPayslip/>}/>    
        <Route path="requests" element={<EmpRequests/>}/>     */}
      </Route>
    </Routes></BrowserRouter>
    </Suspense>
    </>
  )
}
export default App;