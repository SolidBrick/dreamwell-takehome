import React, { useState } from "react";
import { client, account } from "../lib/appwrite";
import { AppwriteException } from "appwrite";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous errors

    // Basic client-side validation
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Login successful!", response);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error instanceof AppwriteException) {
        setErrorMessage("Invalid credentials");
      } else {
        setErrorMessage("Failed to login");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-row">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
