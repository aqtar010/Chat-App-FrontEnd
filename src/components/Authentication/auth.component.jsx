import { useState } from "react";
import "./auth.styles.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [signInInputs, setsignInInputs] = useState({ email: "", password: "" });
  const [signUpInputs, setsignUpInputs] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
    ConfirmPass: "",
  });
  const [matchingPass, setMatchingPass] = useState(true);
  const navigate = useNavigate();
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
  const handleSubmitSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInInputs),
      });

      if (!response.ok) {
        alert("Sign-in failed");
        throw new Error("Sign-in failed");
      }

      const data = await response.json();
      console.log("Success:", data);

      setsignInInputs({ email: "", password: "" });
      navigate('/chatroom')
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error, show error message to the user, etc.
    }
  };

  useEffect(() => {
    if (signUpInputs.Password === signUpInputs.ConfirmPass) {
      setMatchingPass(true);
    } else {
      setMatchingPass(false);
    }
  }, [signUpInputs.Password, signUpInputs.ConfirmPass]);
  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    if (matchingPass) {
      try {
        const response = await fetch("http://localhost:5000/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpInputs),
        });

        if (!response.ok) {
          alert("Sign-up failed");
          throw new Error("Sign-up failed");
        }

        const data = await response.json();
        console.log("Success:", data);

        setsignUpInputs({
          Fname: "",
          Lname: "",
          Email: "",
          Password: "",
          ConfirmPass: "",
        });
      } catch (error) {
        console.error("Error:", error.message);
        // Handle error, show error message to the user, etc.
      }
    } else {
      alert("Password not matching");
    }
  };

  return (
    <div className="auth-container">
      <div className="sign-in-container">
        <h2>Sign In</h2>
        <form type="submit" onSubmit={handleSubmitSignIn} className="form">
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={signInInputs.email}
            required
            onChange={handleSignInChange}
          />
          <input
            name="password"
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
