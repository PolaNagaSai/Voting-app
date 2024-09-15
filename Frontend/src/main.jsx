import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {createBrowserRouter,RouterProvider} from "react-router-dom";

// import App from './App.jsx'
import './index.css';
import Home from './Pages/Home/Home.jsx';
import User from "./User/User.jsx";

import CandidatesList from './Pages/CandidatesList/CandidatesList.jsx';
import LoginSignUp from "./Pages/LoginSignUp/LoginSignUp.jsx";
import NavBar from './Components/NavBar/NavBar.jsx';
import UserNav from './User/UserNav.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from './AuthContext.jsx';
import Admin from './Admin/Admin.jsx';

const router=createBrowserRouter([
  {
  path:"/",
  element:<Home/>,
  },
  {
    path:"/LoginSignUp",
    element:<LoginSignUp/>,
  },
  {
    path:"/Candidates",
    element:<><NavBar/><CandidatesList/></>,
  },
  {
    path:"/admin",
    element: <ProtectedRoute element={<Admin />} />,
  },
  {
    path:"/user",
    element: <ProtectedRoute element={<User />} />,
  },
  {
    path:"/user/candidates",
    element: <ProtectedRoute element={<><UserNav/><CandidatesList /></>} />,
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>,
)
