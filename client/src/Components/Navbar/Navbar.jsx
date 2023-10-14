import { Link, Outlet,} from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

function Navbar(){

    const [name,setName]=useState('');

    const getName=async()=>{
        try{
            const response=await axios.get('http://localhost:5000/signIn',{withCredentials:true});
            if(response){
                setName(response.data.name)
            }
        }catch(error){
            console.log(error);
        }     
    }
    useEffect(()=>{
        getName();
    })

    return(
    <>
    <nav class="navbar navbar-expand-lg container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
  <div class="collapse navbar-collapse flex justify-content-between" id="navbarText">
    <ul class="navbar-nav mr-auto">

      <li class="nav-item active ">
        <Link class="nav-link text-light" to="/">Home</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link text-light" to="/SignUp">Sign Up</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link text-light" to="/Login">Login</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link text-light" to="/dashboard">Dashboard</Link>
      </li>
    </ul>
    <span className="navbar-text text-light">
    {name ? name : <div><Link to='/SignUp' className="text-light">Sign Up</Link><Link to='/Login' className="text-light"> / Login</Link></div>}
  </span>
  
  </div>
</nav>
<Outlet></Outlet>
    </>
    )
}
export default Navbar;