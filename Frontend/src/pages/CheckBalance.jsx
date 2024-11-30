import axios from "axios";
import { useEffect, useState } from "react";

export const CheckBalance = () => {
    const [balance , setBalance] = useState(0);

    
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
                console.log("fiiiiiiiiiiiiii");
                console.log(err);
            }
        }
        fetchData();
    },[]);

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
  

       

    return(
        <div>
            <div>
                <h1>Your balance is {balance}</h1>
            </div>
        </div>
    )
}