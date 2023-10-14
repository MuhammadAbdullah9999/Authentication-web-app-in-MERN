import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        { email }
      );
      // console.log(response);
      setMessage(response.data.message);
    } catch (error) {
      if (error.request.status === 404) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <form
        className="w-50 m-auto mt-5 bg-secondary p-5 text-white rounded"
        onSubmit={handleForgotPassword}
      >
        <div class="form-group">
          <label for="exampleInputPassword1">Eamil</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mt-2"
            id="confrim password"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>

        {message && <p>{message}</p>}
        {error && <p style={{ color: "#ff0000" }}>{error}</p>}
        <div className="mt-5"></div>
      </form>
    </>
  );
}

export default ForgotPassword;
