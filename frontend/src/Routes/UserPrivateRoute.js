import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserPrivateRoute() {
  const navigate = useNavigate();

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (!token || token.trim() === '' || !name || name.trim() === '') {
      generateError("Not Authorized")
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      {localStorage.getItem('token') && localStorage.getItem('name') ? <Outlet /> : null}
    </>
  )
}

export default UserPrivateRoute