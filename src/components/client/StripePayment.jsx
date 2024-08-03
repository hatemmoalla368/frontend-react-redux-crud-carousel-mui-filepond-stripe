import StripeCheckout from 'react-stripe-checkout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../features/AuthSlice';
import { clearCart } from '../../features/cartSlice';

const StripePayment = () => {
    const MySwal = withReactContent(Swal);
const dispatch = useDispatch()
let navigate=useNavigate();
const {total} = useParams();
const publishableKey ='pk_test_51OLA2mAr5IduUJmeA29vkqcjm0g4w1GJGFUsbErjzRZAcPANUGSHGH1pK7N1P0uZTQN9UurGVYypqgh4teMtS6NF00m8D4tY2y';
const {user} = useSelector((state) => state.auth); // Assume you have user data in Redux
//const {cartItems} = useSelector((state) => state.storecart); // Assume you have cart data in Redux
useEffect(() => {
  dispatch(fetchCurrentUser())
  }, [dispatch])

const cartItems= localStorage.getItem("cartItems")

const [product] = useState({
name: 'Total',
price: `${total}`,
});
const priceForStripe = product.price * 100;
const handleSuccess = () => {
MySwal.fire({
icon: 'success',
title: 'Payment was successful',
time: 6000,
});
//window.location = "/articlesclient";
};
const handleFailure = () => {
MySwal.fire({
icon: 'error',
title: 'Payment was not successful',
time: 4000,
});
//navigate('/articlesclient')

};
const payNow = async (token) => { console.log(JSON.stringify(token))
  try {
    const cartItemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
  
  const response = await axios({
  //url: 'https://ecommercebackend2023j.vercel.app/api/payment',
  url: 'https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/payment/',
  method: 'post',
  data: {
  amount: product.price * 100,
  token,
  userId: user.iduser,
  cartItems : JSON.stringify(cartItems)
  },
  });
  console.log('the user id is : ', user.iduser)
  console.log('the cart items : : ', cartItems )
  
  
  if (response.status === 200) {
  handleSuccess();
  dispatch(clearCart())
  }
  } catch (error) {
  handleFailure();
  console.log(error);
  }
  };
  return (
    <div className="home-container">
<div className="products">
<div className="product">
<h2>Complete payment </h2>
<p>
{product.name}
</p>
<p>
{product.price} TND
</p>
<StripeCheckout
stripeKey={publishableKey}
label="Pay Now"
name="Pay With Credit Card"
billingAddress
shippingAddress
amount={priceForStripe}
description={`Your total is ${product.price} TND`}
token={payNow}
/>
</div>
</div>
</div>
  )
}

export default StripePayment
