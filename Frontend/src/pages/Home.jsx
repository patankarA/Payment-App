import React from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const nav1 = ()=>{
        navigate("/signup")
    }
    const nav2 = ()=>{
        navigate("signin")
    }
    return (
        <div>
            <div>Home</div>
            <div  className="w-40">
            <Button lable="signin" onClick={nav2}/>
            <Button lable="signup" onClick={nav1}/>
            </div>
        </div>
    
    )
}