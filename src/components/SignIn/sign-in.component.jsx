import { useState } from "react";
import "./sign-in.styles.scss";

const SignIn = () => {
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

    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
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
    <>
      <div className="sign-in-container">
        <form type="submit" onSubmit={handleSubmit}>
          <input
            name="Email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
          />
          <input
            name="Password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
