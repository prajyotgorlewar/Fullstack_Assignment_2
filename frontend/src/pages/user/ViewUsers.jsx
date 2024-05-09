import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import timeSince from "../../assets/TimeStamp";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("User");

  const { user } = useAuth();
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

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
          const token = authorizationToken;
          const headers = token ? { Authorization: authorizationToken } : {};
          const response = await fetch(`http://localhost:3000/api/admin/viewUsers/deleteUser/${id}`, {
            method: "DELETE",
            headers,
          });

          if (!response.ok) {
            throw new Error("Failed to delete user");
          }
          setUsers(users.filter((user) => user._id !== id));

          const confirmedResponse = await fetch(`http://localhost:3000/api/admin/viewUsers`, { headers });
          if (confirmedResponse.ok) {
            const confirmedData = await confirmedResponse.json();
            setUsers(confirmedData);
          } else {
            console.error("Failed to confirm user deletion from server");
          }

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user:", error);
          setError("Failed to delete user");
          Swal.fire("Error", "Failed to delete user", "error");
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
        const token = authorizationToken;
        const headers = token ? { Authorization: token } : {};
        const response = await fetch(`http://localhost:3000/api/admin/viewUsers`, { headers });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authorizationToken]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter((user) => filter === "All" || user.role === filter);
  if (user.role !== "Admin") {
    navigate("/error");
    return;
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
            className={`btn btn-outline-primary ${filter === "User" ? "active border border-primary" : ""}`}
            onClick={() => setFilter("User")}
          >
            Users
          </button>
          <button
            type="button"
            className={`btn btn-outline-primary ${filter === "Admin" ? "active border border-primary" : ""}`}
            onClick={() => setFilter("Admin")}
          >
            Admins
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Created</th>
              {filter !== "Admin" && <th>Updated</th>}
              {filter !== "Admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>{timeSince(user.createdAt)}</td>
                {filter !== "Admin" && (
                  <td>{timeSince(user.updatedAt)}</td>
                )}

                {filter !== "Admin" && (
                  <td>
                    <Link to={`/admin/viewUsers/editUser/${user._id}`}>
                      <button type="button" className="btn btn-primary mx-1">
                        Edit
                      </button>
                    </Link>
                    <button type="button" className="btn btn-danger mx-1" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewUser;
