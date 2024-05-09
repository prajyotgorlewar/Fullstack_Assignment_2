import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import timeSince from "../../assets/TimeStamp";
import "./ViewPost.css";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const getSinglePostData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/viewPost/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post data");
      }
      const postData = await response.json();
      setPost(postData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSinglePostData();
  }, []);

  return (
    <div className="view-post-container bg-gray-800 min-h-screen flex flex-col justify-center items-center">
      {isLoading && <div className="loading">Loading...</div>}

      {error && <div className="error">Error: {error}</div>}

      {post && (
        <div className="post-wrapper max-w-2xl p-8 rounded shadow-md bg-white flex flex-col gap-4 custom-class">
          <h2 className="text-2xl font-semibold bg-gray-800 text-white w-fit p-2 rounded-xl">{post.title}</h2>

        <div>
        <div><p className="text-bold text-lg ml-1 ">Description: </p></div>
         <div className="container bg-slate-200 rounded-xl">
         <p className="text-gray-700 text-base">{post.detail}</p>
         </div>
          <div>

            <div className="my-2">
                <div></div>
                <div className="bg-gray-800 text-white text-center cursor-pointer rounded-xl"><p className="text-bold text-lg ">Author : {post.author}</p></div>
            </div>
          </div>
          <div className="flex justify-between px-8 items-center">
            <div className="bg-gray-800 p-2 text-white rounded-lg">
                <div>Created At : {timeSince(post.createdAt)}</div>
                <div>Updated At : {timeSince(post.updatedAt)}</div>
            </div>
            <div>
            <a href="/" className="btn btn-primary px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none">Back</a>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
