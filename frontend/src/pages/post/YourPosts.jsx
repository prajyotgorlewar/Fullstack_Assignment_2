import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useAuth } from "../../store/auth";
import timeSince from "../../assets/TimeStamp";

const YourPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Your");


  const handleClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/api/admin/yourPosts/deletePost/${id}`, { 
            method: "DELETE",
            headers: {
              Authorization: authorizationToken,
            }
          });
        
          if (!response.ok) {
            throw new Error("Failed to delete post");
          }
          setPosts(posts.filter((post) => post._id !== id));

          const confirmedResponse = await fetch(`http://localhost:3000/api/admin/yourPosts`, {             
            headers: {
            Authorization: authorizationToken,
          } });
          if (confirmedResponse.ok) {
            const confirmedData = await confirmedResponse.json();
            setPosts(confirmedData);
          } else {
            console.error("Failed to confirm Post deletion from server");
          }

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting post:", error);
          setError("Failed to delete post");
          Swal.fire("Error", "Failed to delete post", "error");
        }
      }
    });
  };

  // Delete logic
  const handleDelete = (id) => {
    handleClick(id);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/yourPosts`, { 
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [authorizationToken]);

  let filteredPosts;
  if (filter === "Your") {
    filteredPosts = posts.filter((post) => post.userId === user._id);
  } else {
    filteredPosts = posts;
  }

  if (user.role !== "Admin") {
    navigate("/error");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <>
      <div className="container text-center">
        <div className="btn-group pt-3">
          <button
            type="button"
            className={`btn btn-outline-primary ${filter === "All" ? "active border border-primary" : ""}`}
            onClick={() => setFilter("All")}
          >
            All Posts
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${filter === "Your" ? "active border border-primary" : ""}`}
            onClick={() => setFilter("Your")}
          >
            Your Posts
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
              <th>View Post</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post._id}>
                <td>{post.author}</td>
                <td>{post.title}</td>
                <td>{timeSince(post.createdAt)}</td>
                <td>{timeSince(post.updatedAt)}</td>

                {user._id === post.userId && (
                  <td>
                    <Link to={`/admin/yourPosts/editPost/${post._id}`}>
                      <button type="button" className="btn btn-primary mx-1">
                        Edit
                      </button>
                    </Link>
                    <button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(post._id)}>
                      Delete
                    </button>
                  </td>
                )}
                {
                  user._id !== post.userId && (
                    <td>
                      <button className="btn btn-warning text-white border-2 border-yellow-700">Not Authorized</button>
                    </td>
                  )
                }
                <td>
                <Link to={`/viewPost/${post._id}`}>
                      <button type="button" className="btn btn-primary mx-1">
                        View
                      </button>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </>
  );
};

export default YourPosts;
