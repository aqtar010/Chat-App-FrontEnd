import { Outlet } from "react-router-dom";
import "./navbar.styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <img src="/Fire_Chat-removebg-preview.png" />
          <span>
            <ul>
              <li><a >Home</a></li>
              <li><a>Sign up</a></li>
              <li><a>Sign In</a></li>
            </ul>
          </span>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Navbar;
