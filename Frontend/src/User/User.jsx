import React from 'react';
import UserNav from './UserNav';
import { useAuth } from '../AuthContext';
import './user.css';
const User = () => {
  const { userName } = useAuth(); 

  return (
    <>
    <UserNav/>
    <div className='msg'>{`welcome ${userName}`}</div>
    </>
  )
}

export default User