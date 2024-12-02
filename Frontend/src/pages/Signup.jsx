import { useState } from "react"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios";
import { useNavigate } from "react-router-dom"


export const Signup =() => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4 ">
                <Heading lable={"Sign up"}/>
                <Subheading lable={"Enter your informaton to create an account"}/> 
                <InputBox type={"name"} lable={"First Name"} placeholder={"first Name"} onChange={(e)=>{
                    setFirstName(e.target.value);
                }} /> 
                <InputBox type={"name"} lable={"Last Name"} placeholder={"last Name"} onChange={(e)=>{
                    setLastName(e.target.value);
                }} />  
                <InputBox type={"email"} lable={"Email"} placeholder={"email"} onChange={(e)=>{
                    setUsername(e.target.value);
                }} />
                <InputBox type={"password"} lable={"Password"} placeholder={"password"} onChange={(e)=>{
                    setPassword(e.target.value);
                }} /> 
                <div className="pt-4">
                    <Button lable={"Sign up"} onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token",response.data.token)
                        navigate("/dashboard")
                    }}/>
                </div>
                <BottomWarning lable={"Already have an acccount?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}