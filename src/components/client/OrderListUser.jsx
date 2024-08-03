import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { clearSelectedOrder, fetchOrderDetails, fetchOrdersUser } from '../../features/ordersSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCurrentUser, login } from '../../features/AuthSlice';

const OrderListUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Assuming user is stored in auth slice
  const { orders, selectedOrder, status, error } = useSelector((state) => state.orders);
  
  // Fetch the current user
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // Fetch the orders once the user data is available
  useEffect(() => {
    if (user) {
      const userId = user._id != null ? user._id : user.id;
      dispatch(fetchOrdersUser(userId));
    }
  }, [dispatch, user]);

  

  const handleViewDetails = (orderId) => {
    dispatch(fetchOrderDetails(orderId));
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedOrder());
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Vos Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>created at</th>
            <th>updated at</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>{order.createdAt}</td>
              <td>{order.updatedAt}</td>
              <td>
                <Button variant="info" onClick={() => handleViewDetails(order._id)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedOrder && (
        <div>
          <h3>Order Details</h3>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
          <div>
            <h4>Items:</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>photo</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.product._id}>
                    <td>{item.product.designation}</td>
                    <td>
                      <img
                        src={item.product.imageart}
                        alt={item.product.designation}
                        style={{ width: '100px', height: 'auto' }}
                      />
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListUser;
