import { Link, Outlet } from "react-router-dom";
import "./navbar.styles.scss";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <img src="/Fire_Chat-removebg-preview.png" />
            <span>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign up</Link>
                </li>
                <li>
                  <Link to="/sign-in">Sign in</Link>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
