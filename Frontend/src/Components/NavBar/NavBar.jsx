import {NavLink} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="nav-container">
        <nav className="nav">
          <NavLink className={(e)=>{return e.isActive? "red":""}} to="/">
            <li>Home</li>
          </NavLink>
          <NavLink className={(e)=>{return e.isActive? "red":""}} to="/LoginSignUp">
            <li>SignUp/Login</li>
          </NavLink>
          <NavLink className={(e )=>{return e.isActive? "red":""}} to="/Candidates">
            <li>Candidates</li>
          </NavLink>
        </nav>
      </div>
    </>
  );
};
export default NavBar;
