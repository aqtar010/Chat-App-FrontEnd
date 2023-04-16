import "./navbar.styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <img src="/Fire_Chat-removebg-preview.png" />
          <span>
            <ul>
              <li>Home</li>
              <li>Sign Up</li>
              <li>Sign In</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
