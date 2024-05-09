import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal for displaying alerts
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminUpdateUser = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
    gender: "",
  });
  const params = useParams();
  const navigate=useNavigate();
  const {authorizationToken}=useAuth();
  // Fetch single user data based on ID
  const getSingleUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { "Content-Type": "application/json", Authorization: authorizationToken } : {};
      const response = await fetch(`http://localhost:3000/api/admin/viewUsers/editUser/${params.id}`, {
        method: "GET",
        headers,
      });
      const userData = await response.json();
      setData({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        gender: userData.gender, 
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  useEffect(() => {
    getSingleUserData();
  }, []); 

  const handleInput = (e) => {
   
    let name=e.target.name;
    let value=e.target.value;
    setData({
        ...data,
        [name]:value,
    })
    };
     // to update data dynamically
     const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const token = authorizationToken;
          const headers = token ? { 
            Authorization: token,
            "Content-Type": "application/json" 
          } : {};
          
          const requestBody = JSON.stringify(data);
      
          const response = await fetch(`http://localhost:3000/api/admin/viewUsers/editUser/${params.id}`, {
            method: "PATCH",
            headers,
            body: requestBody, // Pass the updated data as the request body
          });
      
          if (response.ok) {
            Swal.fire("Updated!", "User updated successfully!", "success");
            navigate('/admin/viewUsers');
          } else {
            const errorData = await response.json(); 
            Swal.fire("Error!", errorData.message || "An error occurred while updating the user.", "error");
          }
        } catch (error) {
          console.error("Error updating user:", error);
          Swal.fire("Error!", "An unexpected error occurred. Please try again later.", "error");
        }
      };
      

  return (
    <div className="bg-slate-600 py-3">
      <div className="container w-2/5 border-3 border-gray-900 py-3 p-2 rounded-lg bg-gray-200">
        <h2 className="text-center text-3xl mt-2 text-white">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control border-2 border-gray-300"
              id="name"
              name="name"
              value={data.name}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control border-2 border-gray-300"
              id="email"
              name="email"
              value={data.email}
              disabled


            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-control border-2 border-gray-300"
              id="gender"
              name="gender"
              value={data.gender}
              onChange={handleInput}

            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label ">
              Role
            </label>
            <select
              className="form-control border-2 border-gray-300"
              id="role"
              name="role"
              value={data.role}
              onChange={handleInput}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateUser;
