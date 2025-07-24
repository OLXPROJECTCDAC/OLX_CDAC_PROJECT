import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
    const navigate = useNavigate();

    const existingUser = {
        firstName: "",
        lastName: "",
        email:"",
        password:"",
        mobileNumber:"",
        profilePic:null,
    }
    const [formData, setFormData] = useState(existingUser);

    const handleChange = (e) => {
        const { name,value,files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'profilePic' ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Updated User Data: ',formData);  
      // todo , to send data to backend here
      navigate("/");

    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

            <form
            className="p-4 bg-white rounded shadow"
            style={{width: '350px'}}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            >
            <h2 className="mb-4 text-center">Update User</h2>

            <input
            type="text"
            name="firstName"
            className="form-control mb-3"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            />

            <input
            type="text"
            name="lastName"
            className="form-control mb-3"
            placeholder="Last Name"
            value={formData.lastName}
            required
            />
  
            <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            />

            <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
            
            <input
            type="tel"
            name="mobileNumber"
            className="form-control mb-3"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            />

            <input
            type="file"
            name="profilePic"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary w-100 mb-2">
                Save Changes
            </button>

            
            </form>
        </div>
    );
   
};
export default UpdateUser;