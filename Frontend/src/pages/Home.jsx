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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
            <p className="text-lg mb-8 text-center max-w-md">
                Explore our platform and connect with others. Sign in to continue or sign up to join us today!
            </p>
            <div className="flex space-x-4">
            <Button lable="signin" onClick={nav2} className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100"/>
            <Button lable="signup" onClick={nav1} className="bg-purple-600 px-6 py-3 rounded-lg shadow-md hover:bg-purple-700"/>
            </div>
        </div>
    
    )
}