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
    <div className="view-post-container bg-black min-h-screen flex flex-col justify-center items-center">
      {isLoading && <div className="loading">Loading...</div>}

      {error && <div className="error">Error: {error}</div>}

      {post && (
        <div className="post-wrapper max-w-2xl p-8 rounded border-orange-500 border-3 font-mono font-bold bg-black">
          <h2 className="text-2xl font-semibold bg-white text-black w-fit p-2 rounded-xl">{post.title}</h2>

          <div>
            <div>
              <p className="text-bold text-lg text-white ml-1">Description: </p>
            </div>
            <br></br>
            <div className="container bg-white text-black rounded-xl">
              <p className=" text-black">{post.detail}</p>
            </div>
            <div className="my-2">
              <div></div>
              <div className="bg-white text-black mx-48 my-4 text-center cursor-pointer rounded-xl">
                <p className="text-bold text-lg">Author: {post.author}</p>
              </div>
            </div>
            <div className="flex justify-between px-8 items-center">
              <div className="bg-black p-2 text-white rounded-lg">
                <div>Created At: {timeSince(post.createdAt)}</div>
                <div>Updated At: {timeSince(post.updatedAt)}</div>
              </div>
              <div>
                <a href="/" className="btn btn-primary px-4 py-2 rounded-md text-black bg-orange-500 hover:bg-white">Back</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
