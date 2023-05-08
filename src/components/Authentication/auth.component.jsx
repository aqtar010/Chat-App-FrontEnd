import { useState } from "react";
import "./auth.styles.scss";

const Auth = () => {
  const [signInInputs, setsignInInputs] = useState({ email: "", password: "" });
  const [signUpInputs, setsignUpInputs] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
    ConfirmPass: "",
  });

  const handleSignInChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setsignInInputs((values) => {
      return { ...values, [name]: value };
    });
  };
  const handleSignupChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setsignUpInputs((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmitSignIn = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInInputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setsignInInputs({ email: "", password: "" });
  };
  const handleSubmitSignUp = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setsignUpInputs({
      Fname: "",
      Lname: "",
      Email: "",
      Password: "",
      ConfirmPass: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="sign-in-container">
        <h2>Sign In</h2>
        <form type="submit" onSubmit={handleSubmitSignIn} className="form">
          <input
            name="Email"
            placeholder="Email"
            type="email"
            value={signInInputs.email}
            required
            onChange={handleSignInChange}
          />
          <input
            name="Password"
            placeholder="Password"
            type="password"
            value={signInInputs.password}
            required
            onChange={handleSignInChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={handleSubmitSignUp}>
          <h2>Sign Up</h2>
          <input
            name="Fname"
            placeholder="First Name"
            type="text"
            value={signUpInputs.Fname}
            required
            onChange={handleSignupChange}
          />
          <input
            name="Lname"
            placeholder="Last Name"
            value={signUpInputs.Lname}
            type="text"
            onChange={handleSignupChange}
          />
          <input
            name="Email"
            placeholder="Email"
            type="email"
            value={signUpInputs.Email}
            required
            onChange={handleSignupChange}
          />
          <input
            name="Password"
            placeholder="Password"
            type="password"
            value={signUpInputs.Password}
            required
            onChange={handleSignupChange}
          />
          <input
            name="ConfirmPass"
            placeholder="Confirm Password"
            type="password"
            value={signUpInputs.ConfirmPass}
            required
            onChange={handleSignupChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
