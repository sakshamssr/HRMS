import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
    let baseUrl = import.meta.env.VITE_BASE_URL;
    let [signupData, setSignupData] = useState({});
    let [error, setError] = useState({});
    let formError={};

    let handleChange = (e) => {
        console.log("Change");
        let { name, value } = e.target;
        console.log(name);
        console.log(value);
        setSignupData({ ...signupData, [name]: value });
        console.log(signupData);
    };

    let handleValidate = (signupData) => {
      if(!signupData.name){
        formError.name = "Name is Required"
      }
      else if(!signupData.email){
        formError.email = "Email is Required"
      }
      else if(!signupData.password){
        formError.password = "Password is Required"
      }
      else if(!signupData.confirmPassword){
        formError.confirmPassword = "Confirm Password is Required"
      }else{
          axios.post(`${baseUrl}/api/signup`,signupData).then((res)=>{
            let { success, message, token } = res.data;
            if(success){
                localStorage.setItem("auth_token",token);
                alert(res.data)
            }
        }).catch((error)=>{
            console.log(error.response)
        })
      }
      setError(formError)
      console.log(error)
    }

    let handleClick = (e) =>{
      handleValidate(signupData)
      console.log("API Data: ",signupData)
    }

    return (
        <>
            <div>I am Signup Component</div>
            <div className="grid grid-cols-3 gap-4">
                <div></div>
                <div className="m-auto">
                    <div className="card w-100 h-150 border-1 border-black-200 m-auto rounded-md shadow-2xl">
                        <h1 className="card-header text-center font-bold text-xl mt-8 mb-2">SIGNUP</h1>
                        <div className="card-body w-80 h-100 m-auto">
                            <div>
                                <label htmlFor="" className="font-bold text-sm">Name:</label>
                                <input type="text" id="name" name="name" className="border-1 border-black-200 w-full mt-2 mb-2 rounded-md" onChange={handleChange} />
                                <p>{error.name}</p>
                            </div>
                            <div>
                                <label htmlFor="" className="font-bold text-sm">Email:</label>
                                <input type="email" id="email" name="email" className="border-1 border-black-200 w-full mt-2 mb-2 rounded-md" onChange={handleChange} />
                                <p>{error.email}</p>
                            </div>
                            <div>
                                <label htmlFor="" className="font-bold text-sm">Password:</label>
                                <input type="password" id="password" name="password" className="border-1 border-black-200 w-full mt-2 mb-2 rounded-md" onChange={handleChange} />
                                <p>{error.password}</p>
                            </div>
                            <div>
                                <label htmlFor="" className="font-bold text-sm">Confirm Password:</label>
                                <input type="password" id="confirm-password" name="confirmPassword" className="border-1 border-black-200 w-full mt-2 mb-2 rounded-md" onChange={handleChange} />
                                <p>{error.confirmPassword}</p>
                            </div>
                            <div>
                                <button className="w-full border-1 rounded-md mt-4 bg-blue-500" onClick={handleClick}> Signup </button>
                            </div>
                            <Link to="/login">Already have an Account.</Link>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    );
}

export default Signup;
