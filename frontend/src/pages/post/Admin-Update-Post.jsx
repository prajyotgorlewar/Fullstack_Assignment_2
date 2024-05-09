import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal for displaying alerts
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import "./AddPost.css"

const AdminUpdatePost = () => {
  const [data, setData] = useState({
    title: "",
    detail: "",
  });
  const params = useParams();
  const navigate = useNavigate();
  const { user, authorizationToken } = useAuth();

  const getSinglePostData = async () => {
    try {
      const token = authorizationToken; 
      const headers = token ? { "Content-Type": "application/json", Authorization: authorizationToken } : {};
      const response = await fetch(`http://localhost:3000/api/admin/yourPosts/editPost/${params.id}`, {
        method: "GET",
        headers,
      });
      const postData = await response.json();

      setData({
        title: postData.title,
        detail: postData.detail,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  useEffect(() => {
    getSinglePostData();
  }, []);

  const handleInput = (e) => {

    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = authorizationToken;
      const headers = token ? {
        Authorization: token,
        "Content-Type": "application/json"
      } : {};

      const requestBody = JSON.stringify(data);

      const response = await fetch(`http://localhost:3000/api/admin/yourPosts/editPost/${params.id}`, {
        method: "PATCH",
        headers,
        body: requestBody,
      });

      if (response.ok) {
        Swal.fire("Updated!", "Post updated successfully!", "success");
        navigate('/admin/yourPosts');
      } else {
        const errorData = await response.json();
        Swal.fire("Error!", errorData.message || "An error occurred while updating the Post.", "error");
      }
    } catch (error) {
      console.error("Error updating Post:", error);
      Swal.fire("Error!", "An unexpected error occurred. Please try again later.", "error");
    }
  };


  return (
    <div className="bg-slate-600 py-3">
      <div className="add-post-container bg-slate-200">
        <h2 className='text-center text-3xl text-blue-600 font-bold'>Edit Post</h2>
        <form onSubmit={handleSubmit}  className="add-post-form">
          <div className="form-group" >
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={user.name}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title} 
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="detail">Detail:</label>
            <textarea
              id="detail"
              name="detail"
              value={data.detail} 
              onChange={handleInput}
              required
            />
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

export default AdminUpdatePost;
