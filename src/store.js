import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "./Features/Employees/EmployeeSlice"

let store = configureStore({
    reducer:{
        employee:employeeReducer,
    },
})

export default store;