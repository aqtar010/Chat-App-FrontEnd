import { Link, Outlet, useNavigate } from "react-router-dom";
import "./navbar.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/user/user.reducer";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const signedInUser=useSelector((state)=>state.user.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                  {!isLoggedIn ? (
                    <Link to="/auth">Sign in</Link>
                  ) : (
                    <span
                      onClick={() => {
                        dispatch(logoutUser());
                        navigate("/auth");
                      }}
                    >
                      Sign out
                    </span>
                  )}
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
