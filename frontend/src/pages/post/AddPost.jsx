import React, { useState } from 'react';
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import "./AddPost.css";

const AddPost = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        author: user.name,
        userId: user._id,
        title: "", // Define title state
        detail: "", // Define detail state
    });
    if(user.role!="Admin"){
        navigate("/error");
        return;
    }
    const handleInput = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/admin/addPost`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Post Added',
                text: 'Your post has been successfully added!',
            }).then(() => {
                navigate("/");
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
            });
        }
    };

    return (
        <div className="bg-slate-600 py-4">
            <div className="add-post-container bg-slate-200">
                <h2 className='text-center text-3xl text-blue-600 font-bold'>Add Post</h2>
                <form onSubmit={handleSubmit} className="add-post-form">
                    <div className="form-group">
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
                            value={post.title} // Bind value to title state
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="detail">Detail:</label>
                        <textarea
                            id="detail"
                            name="detail"
                            value={post.detail} // Bind value to detail state
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" className="btn btn-primary">
                            Add Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
