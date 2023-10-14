import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();

  async function Login() {
    try {
      const response = await axios.get("http://localhost:5000/signIn", {
        withCredentials: true,
      });

      if (response) {
        const data = {
          name: response.data.name,
          email: response.data.email,
        };
        console.log("jwt login successfully");
        navigate("/dashboard", { state: data });
      } else {
        console.log("No data");
        // navigate('/Login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-center my-5">Authentication Module</h1>

      <div className="d-flex flex-column justify-content-between w-25 m-auto mt-5 bg-secondary p-5 text-white rounded">
        <Link to="/SignUp" className=" text-center">
          <button className="btn btn-primary mb-3 w-100">Sign Up</button>
        </Link>
        <Link to="/Login" className="text-center">
          <button className="btn btn-primary w-100" onClick={Login}>
            Login
          </button>
        </Link>
      </div>
    </>
  );
}
export default HomePage;
