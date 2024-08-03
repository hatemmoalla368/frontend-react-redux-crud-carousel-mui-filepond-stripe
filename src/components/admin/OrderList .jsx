// components/OrdersList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchOrderDetails, clearSelectedOrder,deleteOrder } from '../../features/ordersSlice';
import { Button, Table } from 'react-bootstrap';
import { fetchUsers } from '../../features/AuthSlice';

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders, selectedOrder, status, error } = useSelector((state) => state.orders);
  const {user} = useSelector((state) => state.auth);

  //const {userStatus} = useSelector((state) => state.auth.status);
 // const {error} = useSelector((state) => state.auth.error);

  useEffect(() => {
    
      dispatch(fetchUsers());
    
  }, [ dispatch]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleViewDetails = (orderId) => {
    dispatch(fetchOrderDetails(orderId));
  };
  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(orderId));
    }
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedOrder());
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>first name</th>
            <th>last name</th>
            <th>email</th>

            <th>Total Amount</th>
            <th>Status</th>
            <th>created at</th>
            <th>updated at</th>

            {user && (user.role === 'superadmin'||user.role === 'admin') && <th scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.firstname}</td>
              <td>{order.user.lastname}</td>
              <td>{order.user.email}</td>


              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>{order.createdAt}</td>
              <td>{order.updatedAt}</td>
              {user && (user.role === 'superadmin'||user.role === 'admin') && (

              <td>
                <Button variant="info" onClick={() => handleViewDetails(order._id)}>
                  View Details
                </Button>
                <Button variant="danger" onClick={() => handleDeleteOrder(order._id)} style={{ marginLeft: '10px' }}>
                  Delete
                </Button>
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Conditionally render order details */}
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

export default OrdersList;
