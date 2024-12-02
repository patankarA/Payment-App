import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useLocation } from "react-router-dom";
 

 export function Dashboard(){
  const location = useLocation();
  const user = location.state?.user;

    return <div className="bg-gradient-to-r from-blue-500 to-purple-600">
      <Appbar/>
      <div className="mt-8">
        <Balance/>
        <Users/>
      </div>
      
    </div>
 }