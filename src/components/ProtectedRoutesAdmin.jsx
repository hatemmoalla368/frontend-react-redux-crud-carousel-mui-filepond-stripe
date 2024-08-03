import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavScrolls from './NavScrolls';
import { jwtDecode } from "jwt-decode";
const ProtectedRoutesAdmin = () => {
    let token = localStorage.getItem("CC_Token");

    const decodedToken = jwtDecode(token); // Use jwt_decode.decode(token) if using named import
    const userRole = decodedToken.role; // Assuming the role is stored in the token's payload
  return(
    (userRole=== 'admin' ||userRole=== 'superadmin') ? <><Outlet/></>: <Navigate to="/articlesclient"/>
)
}

export default ProtectedRoutesAdmin;
