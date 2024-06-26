import "./Register.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        role: "", // Initialize role field
    });
    const [registrationStatus, setRegistrationStatus] = useState({
        message: "",
        error: false,
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            const res_data = await response.json();
            storeTokenInLS(res_data.token);
            setUser({
                name: "",
                email: "",
                password: "",
                gender: "",
                role: "", // Reset role field after successful registration
            });
            navigate("/");
        } else {
            const errorData = await response.json();
            setRegistrationStatus({
                message: errorData.msg, 
                error: true,
            });
        }
    } catch (error) {
        console.log("register", error);
    }
};

return (
    <>
    <section>
    <main>
    <div className="h-screen section-registration pt-3 bg-black font-mono">
    <div className="font-bold text-center text-2xl text-white">SIGN UP</div>
    <div className="container w-2/5 flex-column items-center  border-orange-500 border-3 rounded-lg p-3 px-5 bg-black mt-3">
    <form onSubmit={handleSubmit}>
    <div className="form-group my-2">
    <label htmlFor="name" className="font-semibold text-white">Name</label>
    <input type="text" className="form-control rounded-md" onChange={handleInput}
    value={user.name} name="name" id="name" placeholder="Enter your name"
    required autoComplete="off" />
    </div>
    <div className="form-group my-2">
    <label htmlFor="email" className="font-semibold text-white">Email</label>
    <input type="email" className="form-control rounded-md" onChange={handleInput}
    value={user.email} name="email" id="email" placeholder="Enter your email"
    required autoComplete="off" />
    {registrationStatus.error && (
        <div className="text-red-500 text-sm mt-1">{registrationStatus.message}</div>
    )}
    </div>
    <div className="form-group my-2">
    <label htmlFor="password" className="font-semibold text-white">Password</label>
    <input type="password" className="form-control rounded-md" onChange={handleInput} name="password"
    value={user.password} id="password" placeholder="Enter your password"
    required autoComplete="off" />
    </div>
    <div className="form-group my-2">
    <label htmlFor="gender" className="font-semibold text-white">Gender</label>
    <select className="form-select block w-full rounded-none" name="gender" id="gender" required onChange={handleInput} value={user.gender}>
    <option value="" disabled>Select</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
    </select>

    
    </div>
    <div className="form-group my-2">
    <label className="font-semibold text-white">Role</label>
    <div>
    <label className="mr-2 text-white">
    <input
    type="radio"
    name="role"
    value="User"
    checked={user.role === "User"}
    onChange={handleInput}
    className="appearance-none w-4 h-4 border-3  border-white rounded-md mx-2 checked:bg-white"
    />
    User
    </label>
    <label className="mr-2 text-white">
    <input
    type="radio"
    name="role"
    value="Admin"
    checked={user.role === "Admin"}
    onChange={handleInput}
    className="appearance-none  w-4 h-4 border-3  border-white rounded-md mx-2 checked:bg-white"
/>

     Admin
    </label>
    </div>
    </div>
    <div className="text-center">
    <button type="submit" className="btn btn-primary text-black font-bold text-center bg-orange-500 mt-3 hover:bg-white">Register</button>
    </div>
    
    </form>
    </div>
    </div>
    </main>
    </section>
    </>
)
}

export default Register;
