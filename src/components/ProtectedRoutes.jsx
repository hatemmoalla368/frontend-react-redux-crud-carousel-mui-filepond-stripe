import { Outlet, Navigate } from 'react-router-dom'
import NavScrolls from "./NavScrolls";
const ProtectedRoutes = () => {
let token=localStorage.getItem("CC_Token");
// console.log("token est " + token)
return(
token!=null ? <><NavScrolls/><Outlet/></>: <Navigate to="/"/>
)
}
export default ProtectedRoutes