import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center" >
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading lable={"Sign in"}/>
                <Subheading lable={"Enter your credentials to access your account"} />
                <InputBox type={"email"} lable={"Email"} placeholder={"email"} onChange={(e)=>{
                     setUsername(e.target.value);
                }}/>
                <InputBox type={"password"} lable={"Password"} placeholder={"password"}  onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                <div className="pt-4">
                    <Button lable={"Sign in"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin" , {
                            username,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                        console.log("token is "+ response.data.token);
                        navigate("/dashboard")
                    }}/>
                </div>
                <BottomWarning lable={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>

}