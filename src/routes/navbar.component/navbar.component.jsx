import { Link, Outlet, useNavigate } from "react-router-dom";
import "./navbar.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/user/user.reducer";
import { socketDisconnect } from "../../components/chat.component/chat.component";
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
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
                        socketDisconnect();
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
