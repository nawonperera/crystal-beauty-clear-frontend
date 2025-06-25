import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = () => {
        // console.log("Email: ",email)
        // console.log("Password: ",password)    
        setLoading(true)
        
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log("Login successful", response.data);
                toast.success("Login Successful") 
                localStorage.setItem("token", response.data.token)
                
                const user = response.data.user
                if(user.role === "admin"){
                    navigate("/admin") 
                }else{
                    navigate("/")
                }
                setLoading(false)
            }
        ).catch(
            (error)=>{
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message||"Login failed")
                setLoading(false)                
            }
        )

        console.log("Login button clicked");
        
    }

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className=" w-[50%] h-full"></div>
            <div className=" w-[50%] h-full flex justify-center items-center">
                <div className="w-[600px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
                    <input onChange={
                        (event)=>{
                            setEmail(event.target.value);
                        }} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="Email"></input>
                    <input onChange={
                        (event)=>{
                            setPassword(event.target.value);
                        }} className="w-[400px] h-[50px] border border-white rounded-xl text-center" type="password" placeholder="Password"></input>
                    <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer m-[5px]">
                        {
                            loading?"Loading...":"Login"
                        }
                    </button>
                    <p className="text-gray-600 text-center m[10px]">
                        Don't have an account yet?
                        &nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700">
                            <Link to={"/register"}>Register Now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;