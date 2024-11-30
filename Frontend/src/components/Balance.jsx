
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const  Balance = () => {
    const navigate = useNavigate();

    return (
    <div className="flex mt-1 ml-2">
        <div className="ml-4 text-lg">
            <Button lable={"Check bank balance"} onClick={(e)=>{
                navigate("/checkbalance")
            }}/>
        </div>
        <div className="ml-4 text-lg">
            <Button lable={"See transaction history"} onClick={(e)=>{
                navigate("/transactions")
            }}/>
        </div>
        
    </div>
    )
}