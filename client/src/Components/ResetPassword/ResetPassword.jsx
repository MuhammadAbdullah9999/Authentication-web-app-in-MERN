import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [resetMessage,setResetMessage]=useState(false);

  const Password = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const Reset = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (data.password === data.confirmPassword && (data.password!=='' && data.confirmPassword!=='') ) {
      try {
        const response = await axios.post(
          "http://localhost:5000/reset-password",
          {
            ...data,
            token: token,
          },
          { withCredentials: true }
        );
     
        if(response){
          setResetMessage(true);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    } else{
      setError("Password and Confirm password should not be empty")
    }
  };

  return (
    <div className="w-50 m-auto mt-5 bg-secondary p-5 text-white rounded">
    {!resetMessage ? (
      <form >
        <h1 className="text-center">Reset Password</h1>
    
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={Password}
            type="password"
            name="password"
            className="form-control mt-2"
            id="password"
            placeholder="Enter Password"
          />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
    
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={Password}
            type="password"
            name="confirmPassword"
            className="form-control mt-2"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <button type="button" className="btn btn-primary mt-4" onClick={Reset}>
          Reset
        </button>
    
        {error && <p style={{ color: "#ED2B2A" }}>{error}</p>}
      </form>
    ) : (
      <div className="text-center">
        <p>Password has been reset successfully!</p>
        <Link to="/Login" className="text-center">
          <button className="btn btn-primary">Login</button>
        </Link>
      </div>
    )}    
    </div>
  );
}
export default ResetPassword;
