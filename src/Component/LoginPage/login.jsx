import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let baseUrl = import.meta.env.VITE_BASE_URL;

function Login(){
    let [loginData,setLoginData] = useState({});
    let [error,setError] = useState({});
    let formError = {};
    let navigate = useNavigate();

    let handleChange =(e)=>{
        // console.log("Change")
        let {name, value} = e.target;
        // console.log(name) 
        // console.log(value) 
        setLoginData({...loginData, [name]: value})
        // console.log(loginData)
    }
    let handleValidate = (loginData)=>{
        
        if(!loginData.email){
            formError.email = "Email is Required";
        }
        else if(!loginData.password){
            formError.password = "Password is Required";
        }
        else if(!loginData.confirmPassword){
            formError.confirmPassword = "Confirm Password is Required";
        }
        else{
            console.log("API Data: ", loginData)
            axios.post(`${baseUrl}/api/login`,loginData).then((res)=>{
                let {success, message, role, email, token} = res.data;
                console.log("Res",res.data)
                if(success){
                    if(role == "admin"){
                        localStorage.setItem("token",token)
                        alert("Yes")
                        navigate("/admin/dashboard");
                    }
                    else if(role == "user"){
                        localStorage.setItem("token",token)
                        alert("Yes")
                        navigate("/employee/dashboard",{state:email});
                    }
                }
            }).catch(()=>{
                console.log("No")
            })
        }


        setError(formError)

    }
    let handleClick = ()=>{
        handleValidate(loginData);
        console.log(formError)
        // console.log(loginData)
    }
    return(
        <>
        
            <div>I am login Component</div>
            <div class="grid grid-cols-3 gap-4">
                <div class="..."></div>
                <div class="m-auto">
                    <div className="card w-100 h-150 border-1 border-black-200 m-auto rounded-md shadow-2xl">
                        <h1 className="card-header text-center font-bold text-xl mt-8 mb-2">LOGIN</h1>
                        <div className="card-body w-80 h-100 m-auto">
                            <div>
                                <label htmlFor="" className="font-bold text-sm">Email:</label>
                                <input type="email" name="email" className="border-1 border-black-200 w-full mt-2 mb-2 rounded-md" onChange={handleChange}/>
                                <p>{error.email}</p>
                            </div>
                            <div>
                                <label htmlFor="" className="font-bold text-sm">Password:</label>
                                <input type="password" name="password" className="border-1 border-black-200 w-full mt-2 mb-2 rounded-md" onChange={handleChange} />
                                <p>{error.password}</p>
                            </div>
                            <div>
                                <label htmlFor="" className="font-bold text-sm">Confirm Password:</label>
                                <input type="password" name="confirmPassword" className="border-1 border-black-200 w-full mt-2 mb-2 rounded-md" onChange={handleChange} />
                                <p>{error.confirmPassword}</p>
                            </div>
                            <div>
                                <button onClick={handleClick} className="w-full border-1 rounded-md mt-4 bg-blue-500"> Login </button>
                            </div>
                            <Link to="/signup">Don't have an Account.</Link>
                        </div>
                    </div>
                </div>
                <div class="..."></div>
            </div>
        </>
    )
}
export default Login;
