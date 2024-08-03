import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import "@fortawesome/fontawesome-free/css/all.css";
import Listarticles from './components/client/Listarticles';
import './App.css';
import Cart from './components/client/Cart';
import React, { useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductsAppAdmin from './components/admin/articles/ProductsAppAdmin';
import { ToastContainer } from 'react-toastify';
import StripePayment from './components/client/StripePayment';
import Scategoriesappadmin from './components/admin/scategories/Scategoriesappadmin';
import Login from './components/admin/Login';
import NavScrolls from './components/NavScrolls';
import Register from './components/admin/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Logout from './components/admin/Logout';
import Carouselproduits from './components/client/Carouselproduits';
import User from './components/admin/User';
import OrderList from './components/admin/OrderList ';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/AuthSlice';
import ProtectedRoutesAdmin from './components/ProtectedRoutesAdmin';
import ForgotPassword from './components/admin/ForgotPassword';
import ResetPassword from './components/admin/ResetPassword';
import OrderListUser from './components/client/OrderListUser';
import { fetchOrdersUser } from './features/ordersSlice';




function App() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchCurrentUser());

  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error fetching user</div>;
  

  return (
    <>
    
    <ToastContainer/>
     <Router>
      
      <Routes>
        
        <Route path='/menu' element={<NavScrolls/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:tokenres" element={<ResetPassword />} />
        <Route element={<ProtectedRoutes/>}>
        <Route path='/articlesclient' element={<Listarticles/>}/>
        <Route path='/orderlistuser' element={<OrderListUser/>}/>
        <Route element={<ProtectedRoutesAdmin />}>
        <Route path='/orderlist' element={<OrderList/>}/>
        
        <Route path='/users' element={<User/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/articlesadmin' element={<ProductsAppAdmin/>}/>
        <Route path='/pay/:total' element={<StripePayment/>}/>
        <Route path='/scategoriesadmin' element={<Scategoriesappadmin/>}/>
        </Route>
        

      </Routes>
     </Router>
    </>
  )
}

export default App
