import SignUpPage from "./Components/SignUpPage/SignUpPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Navbar from "./Components/Navbar/Navbar";

import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar></Navbar>}>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/SignUp" element={<SignUpPage></SignUpPage>}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
              <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
              <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
              <Route path="*" element={<h2 className="text-center mt-5">404 not Found</h2>}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
