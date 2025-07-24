import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
function LoginPage (){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Email : ", email);
        console.log("Password : ",password);
    }; 
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="p-4 bg-white rounded shadow" style={{ width: '300px' }} onSubmit={handleLogin}>
        <h2 className="mb-4 text-center">Login</h2>
        <input type="email" name="email" className="form-control mb-3" placeholder="Email" required />
        <input type="password" name="password" className="form-control mb-3" placeholder="Password" required />
        <button className="btn btn-primary w-100 mb-2" type="submit">Login</button>
        <button className="btn btn-link w-100" type="button" onClick={() => navigate('/signup')}>
          New user? Sign Up
        </button>
        <button className="btn btn-link w-100" type="button" onClick={() => navigate('/forgetPassword')}>
         Forget Password
        </button>
      </form>
    </div>
  
    
       </>
    );

}

export default LoginPage;