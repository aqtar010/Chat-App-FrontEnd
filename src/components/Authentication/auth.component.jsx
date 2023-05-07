import { useState } from "react";
import "./auth.styles.scss";

const Auth = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="auth-container">
      <div className="sign-in-container">
        <h2>Sign In</h2>
        <form type="submit" onSubmit={handleSubmit} className="form">
          <input
            name="Email"
            placeholder="Email"
            type="email"
            required
            onChange={handleChange}
          />
          <input
            name="Password"
            placeholder="Password"
            type="password"
            required
            onChange={handleChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="sign-up-container">
        <form>
          <h2>Sign Up</h2>
          <input name="Fname" placeholder="First Name" type="text" required/>
          <input name="Lname" placeholder="Last Name" type="text" />
          <input name="Email" placeholder="Email" type="email" required/>
          <input name="Password" placeholder="Password" type="password" required/>
          <input
            name="ConfirmPass"
            placeholder="Confirm Password"
            type="password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
