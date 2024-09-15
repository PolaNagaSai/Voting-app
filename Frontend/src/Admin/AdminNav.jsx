import { NavLink ,useNavigate} from 'react-router-dom';
import { useAuth } from "../AuthContext";
import React from 'react';
import "./AdminNav.css";


const AdminNav = () => {
  const { logout } = useAuth(); // Use your auth context to access the logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth state and token
    navigate('/'); // Redirect to the login page or home page
  };
  return (
    <>
    <div>
    <nav className='navbar'>
          <div>
        <h1 className='header_msg'>Hello! Admin Welcome</h1>
      </div>
          <button className='logout-button' onClick={handleLogout}>
          Logout
        </button>
    </nav>
    </div>
    </>
  )
}

export default AdminNav