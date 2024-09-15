import { NavLink ,useNavigate} from 'react-router-dom';
import { useAuth } from "../AuthContext";
import React from 'react';
import "./UserNav.css";


const UserNav = () => {
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
          <NavLink className={(e)=>{return e.isActive? "red":""}} to="/user">
            <li>User</li>
          </NavLink>
          <NavLink className={(e )=>{return e.isActive? "red":""}} to="/user/candidates">
            <li>Candidates</li>
          </NavLink>
          <button className='logout-button' onClick={handleLogout}>
          Logout
        </button>
    </nav>
    </div>
    </>
  )
}

export default UserNav