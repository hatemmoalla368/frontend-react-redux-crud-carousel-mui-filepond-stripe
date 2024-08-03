// src/features/users/UsersList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../features/AuthSlice';
import { updateUserStatus, updateUserRole  } from '../../features/AuthSlice';

const User = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.auth);

  //const {userStatus} = useSelector((state) => state.auth.status);
 // const {error} = useSelector((state) => state.auth.error);

  useEffect(() => {
    
      dispatch(fetchUsers());
    
  }, [ dispatch]);

  const handleStatusChange = (id, isActive) => {
    dispatch(updateUserStatus({ id, isActive }));
  };
  const handleRoleChange = (id, role) => {
    dispatch(updateUserRole({ id, role }));
  };

  let content;

 
    content = (
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Active</th>
            
            {user && user.role === 'superadmin' && <th scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((utilisateurs, index) => (
            <tr key={utilisateurs._id}>
              <th scope="row">{index + 1}</th>
              <td>{utilisateurs.firstname}</td>
              <td>{utilisateurs.lastname}</td>
              <td>{utilisateurs.email}</td>
              <td>{utilisateurs.role}</td>
              <td>{utilisateurs.isActive ? 'Yes' : 'No'}</td>
              
              {user && user.role === 'superadmin' && (
                <td>
                  <button
                    onClick={() => handleStatusChange(utilisateurs._id, !utilisateurs.isActive)}
                    className="btn btn-sm btn-primary"
                  >
                    {utilisateurs.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <select
                    onChange={(e) => handleRoleChange(utilisateurs._id, e.target.value)}
                    value={utilisateurs.role}
                    className="form-select form-select-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                 
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
 

  return (
    <section>
      <h2>Users</h2>
      {content}
    </section>
  );
};

export default User;

