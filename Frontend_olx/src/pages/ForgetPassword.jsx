import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
function ForgetPassword(){
    const [mobileNumber,setMobileNumber] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Mobile Number:  ",mobileNumber);
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form className="p-4 bg-white rounded shadow" style={{ width: '300px' }} onSubmit={handleLogin}>
                <h3 className="mb-4 text-center">Enter Mobile Number</h3>
                <input type="tel" name="mobileNumber" className="form-control mb-3" placeholder="Mobile Number" required />
                <button className="btn btn-primary w-100 mb-2" type="submit">Send OTP</button>
                <button className="btn btn-link w-100" type="button" onClick={() => navigate('/login')}>
                Login Page
                </button>
            </form>
        </div>
    );
}
export default ForgetPassword;