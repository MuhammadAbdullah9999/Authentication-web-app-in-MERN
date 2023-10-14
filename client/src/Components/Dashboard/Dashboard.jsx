import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logoutMessage, setLogoutMessage] = useState(""); // New state for logout message
  const [logout, setLogout] = useState(false);
  const [showBody, setShowBody] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);
 
  const dashboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dashboard", {
        withCredentials: true,
      });

      if (response) {
        setName(response.data.name);
        setEmail(response.data.email);
        setShowDashboard(true);
        setLoading(false);
      }
    } catch (error) {
      setLoginStatus(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    dashboard();
  }, []);

  const Logout = async () => {
    setLogoutMessage("Logged out successfully"); // Show logout message
    setShowBody(false);

    try {
      await axios.get("http://localhost:5000/Logout", {
        withCredentials: true,
      });
    } catch (error) {
      alert(error.response.data.message);
    }

    setTimeout(() => {
      setLogoutMessage(""); // Clear the logout message after 3 seconds
      setLogout(true);
    }, 2500);
  };

  useEffect(() => {
    if (logout) {
      window.history.pushState(null, "", "/Login");
      window.location.reload();
    }
  }, [logout]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <h1>Loading...</h1>
        </div>
      ) : (
        showDashboard && (
          <div className="text-center">
            {showBody && (
              <>
                <h1 className="my-4">Signed In Successfully</h1>
                <table className="table table-striped text-center w-50 m-auto mt-5">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{name}</td>
                      <td>{email}</td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-primary mt-5" onClick={Logout}>
                  Log Out
                </button>
              </>
            )}
          </div>
        )
      )}
      <div className="text-center">
        {" "}
        {logoutMessage && <h2>{logoutMessage}</h2>}{" "}
      </div>

      {loginStatus && (
        <div className="text-center">
          <h3 className="text-danger">You are not Signed in </h3>
          <h3 className="text-center text-danger my-5">SignUp / Login</h3>

          <div className="d-flex flex-column justify-content-between w-25 m-auto mt-5 bg-secondary p-5 text-white rounded">
            <Link to="/SignUp" className=" text-center">
              <button className="btn btn-primary mb-3 w-100">Sign Up</button>
            </Link>
            <Link to="/Login" className="text-center">
              <button className="btn btn-primary w-100">Login</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
