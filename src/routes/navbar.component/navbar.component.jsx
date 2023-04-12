import "./navbar.styles.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <img src="/public/Fire_Chat-removebg-preview.png" />
          <ul>
            <li>Home</li>
            <li>Sign Up</li>
            <li>Sign In</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
