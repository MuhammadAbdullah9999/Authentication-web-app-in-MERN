import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const signUp = async () => {
    try {
      if (formData.name.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "") {
        setError("Please fill in all fields.");
        return;
      }

      const hasSpecialCharacters = /[^\w\s]/.test(formData.name);
      if (hasSpecialCharacters) {
        setError("Name can only contain alphabets");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Invalid email address.");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }
      // console.log(formData);
      const response = await axios.post("http://localhost:5000/signUp", formData, {
        withCredentials: true,
      });
      
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
       setError(error.response.data.message);      
    }
  };
  const handleSignInWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <>
      <form className="w-50 m-auto mt-4 bg-secondary p-5 text-white rounded" onSubmit={handleSubmit}>
        <h1 className="text-center">Sign Up Page</h1>

        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            onChange={handleChange}
            type="name"
            className="form-control mt-2"
            id="exampleInputName"
            name="name"
            aria-describedby="Name"
            placeholder="Enter Name"
          />
          <small id="name" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control mt-2"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control mt-2"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Sign Up
        </button>

        {error && <p style={{ color: "#ED2B2A" }}>{error}</p>}
        <div className="mt-2">
          <span>Already have an Account? </span>
          <Link to="/Login" className="text-light">
            Login
          </Link>
        </div>
      </form>
      <div className="text-center mb-4">
        <button onClick={handleSignInWithGoogle} className="btn btn-secondary mt-3 w-50">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
            className="me-2"
            style={{ height: "20px", width: "20px" }}
          />
          Sign Up with Google
        </button>
      </div>
    </>
  );
}

export default SignUpPage;
