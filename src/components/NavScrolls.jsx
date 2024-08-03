import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link } from "react-router-dom"
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, login } from '../features/AuthSlice';
import { getTotals } from '../features/cartSlice';

const NavScrolls = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
const {cartTotalQuantity} = useSelector((state) => state.storecart);

const { user, isLoading, isError, errorMessage } = useSelector((state) => state.auth);

useEffect(() => {
  dispatch(fetchCurrentUser());
}, [dispatch]);
/*if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error: {errorMessage}</div>;*/
dispatch(getTotals()); // Update totals


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
<Container fluid>
<IconButton size="large"
edge="end"
aria-label="account of current user"
aria-haspopup="true"
color="error"
onClick={()=>{navigate("/cart")}}
>
<ShoppingCartIcon sx={{ fontSize: 40 }}/>
<Badge badgeContent={cartTotalQuantity>0?cartTotalQuantity:0}

color="success">
</Badge>
</IconButton>
<Navbar.Brand href="#"> </Navbar.Brand>
<Navbar.Toggle aria-controls="navbarScroll" />
<Navbar.Collapse id="navbarScroll">
<Nav
className="me-auto my-2 my-lg-0"
style={{ maxHeight: '100px' }}
navbarScroll
>
{ user && (user.role === 'admin' || user.role === 'superadmin') && (
<Nav.Link as={Link} to="/articlesadmin">Articles</Nav.Link>
)}
 { user && (user.role === 'admin' || user.role === 'superadmin') && (
<Nav.Link as={Link} to="/categories">Catégories</Nav.Link>
)}
 { user && (user.role === 'admin' || user.role === 'superadmin') && (
<Nav.Link as={Link} to="/scategoriesadmin">Sous Catégories</Nav.Link>
)}

<Nav.Link as={Link} to="/articlesclient">articles app</Nav.Link>
<Nav.Link as={Link} to="/orderlistuser">vos orders</Nav.Link>

<NavDropdown title={`${user?.firstname ?? ''} ${user?.lastname ?? ''}`} id="navbarScrollingDropdown">
<NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
{ user && (user.role === 'admin' || user.role === 'superadmin') && (
<NavDropdown.Item as={Link} to="/orderlist">
list des Orders
</NavDropdown.Item>
)}
<NavDropdown.Divider />
{ user && (user.role === 'admin' || user.role === 'superadmin') && (
    <NavDropdown.Item as={Link} to="/users">
      List des utilisateurs
    </NavDropdown.Item>
  )}
</NavDropdown>

</Nav>

</Navbar.Collapse>
</Container>
</Navbar>
  )
}

export default NavScrolls
