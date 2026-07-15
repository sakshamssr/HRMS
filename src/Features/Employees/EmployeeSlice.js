import {createSlice} from '@reduxjs/toolkit';

let initialState ={
    employeeData:[],
};

let employeeSlice = createSlice({
    name:"employee",
    initialState,
    reducer:{
        setEmployeeData : (state,action) => {
            state.employeeData = action.paylod;
        },
    },
});

export const {setEmployeeData} = employeeSlice.actions;
export default employeeSlice.reducer;