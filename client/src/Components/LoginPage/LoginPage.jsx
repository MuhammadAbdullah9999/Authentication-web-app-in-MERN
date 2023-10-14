import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      if (formData.email.trim() === "" || formData.password.trim() === "") {
        setError("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Invalid email address.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/signIn",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        navigate("/dashboard", { state: { name: response.data.name } });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSignInWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <form
        className="w-50 m-auto mt-5 bg-secondary p-5 text-white rounded"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Sign In Page</h1>

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
          Login
        </button>

        {error && <p style={{ color: "#ED2B2A" }}>{error}</p>}

        <div className="mt-5">
          <div className="d-flex w-100 justify-content-between">
            <div>
              <span>Don't have an Account? </span>
              <Link to="/SignUp" className="text-light">
                Sign Up
              </Link>
            </div>
            <Link to="/forgot-password" className="text-light">
              Forgot Password?
            </Link>
          </div>
        </div>
      </form>

      <div className="text-center">
        <button
          onClick={handleSignInWithGoogle}
          className="btn btn-secondary mt-4 w-50"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
            className="me-2"
            style={{ height: "20px", width: "20px" }}
          />
          Sign in with Google
        </button>
      </div>
    </>
  );
}

export default LoginPage;
