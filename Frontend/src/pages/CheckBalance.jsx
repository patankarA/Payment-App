import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CheckBalance = () => {
    const [balance , setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(()=>{
        async function fetchData(){
            try {
                const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        Authorization:"Bearer "+ localStorage.getItem("token")}
                });
                console.log(res.data);
                setBalance(res.data.balance);
            } catch (error) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    const handleGoToDashboard = () => {
        navigate("/dashboard");  // Navigate to dashboard when button is clicked
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-xl font-semibold text-blue-500">Loading...</div>
            </div>
        );
    }
    // async function fetchData(){
    //     try {
    //         const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
    //             headers:{
    //                 Authorization:"Bearer "+ localStorage.getItem("token")}
    //         });
    //         console.log(res.data);
    //         setBalance(res.data.balance);
    //     } catch (error) {
    //         console.log("fiiiiiiiiiiiiii");
    //         console.log(err);
    //     }
    // }
    // fetchData();
  

       

    // return(
    //     <div>
    //         <div>
    //             <h1>Your balance is {balance}</h1>
    //         </div>
    //     </div>
    // )


    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Account Balance</h1>
                <div className="text-xl text-center text-gray-700 mb-4">
                    Your balance is{" "}
                    <span className="text-2xl font-semibold text-green-500">
                        {balance !== null ? balance : "not available"}
                    </span>
                </div>
                <div className="text-center">
                    <button
                        onClick={handleGoToDashboard}  // Attach the click handler
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );

}