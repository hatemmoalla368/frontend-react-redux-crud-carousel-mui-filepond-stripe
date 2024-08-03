// features/orders/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],
  selectedOrder: null,
  status: 'idle',
  error: null,
};

// Fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/orders');
  return response.data;
});

// Fetch order details
export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (orderId) => {
  const response = await axios.get(`https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/orders/${orderId}`);
  return response.data;
});

// Delete an order
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
  await axios.delete(`https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/orders/${orderId}`);
  return orderId;
});

/*export const fetchOrdersUser = createAsyncThunk('orders/fetchOrdersUser', async () => {
  
  const response = await axios.get('http://localhost:3001/api/orders/myorders');
  return response.data.data;
});*/

// features/orders/ordersSlice.js

// features/orders/ordersSlice.js

export const fetchOrdersUser = createAsyncThunk('orders/fetchOrdersUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://backend-node-express-mongoose-stripe-jwt.onrender.com/api/orders/myorders/${userId}`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle token expiration
      return rejectWithValue('Session expired, please log in again.');
    }
    return rejectWithValue(error.message);
  }
});



const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload);
      })
      .addCase(fetchOrdersUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrdersUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
