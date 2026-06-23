import Login from "./Component/LoginPage/login";
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

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App(){
  return(
    <>
    
    <BrowserRouter><Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/admin2" element={<Panel/>}/>
      <Route path="/admin" element={<Panel2/>}>
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
    </Routes></BrowserRouter>
    </>
  )
}
export default App;