import "./Home.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import timeSince from "../../assets/TimeStamp";
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6); // Number of posts per page
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/public/posts", {
                    method: "GET",
                    headers: {},
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <>
            <div className="bg-white">
                <div className="container">
                    <div className="p-4 rounded-xl h-96 ">
                        {user && user.name ? (
                            <div className=" flex justify-around text-2xl text-white font-semibold bg-gradient-to-r from-gray-500 to-gray-300 p-2 rounded-lg">
                                <div>Welcome, {user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1) + " "}!</div>
                                <div className=" cursor-pointer bg-gray-500 w-fit px-2 rounded-md">Role : {user.role}</div>
                            </div>



                        ) : (
                            <div className=" text-white text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-300 p-2 rounded-lg ">
                                Welcome, Guest!
                            </div>
                        )}
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {currentPosts.map((post) => (
                            <div key={post._id} className="col">
                                <div className="card h-100 border border-primary rounded shadow bg-gray-300">
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div className="">
                                            <div className="bg-slate-600 w-fit px-4 py-1 text-3xl rounded-2xl text-white"><h5 className="card-title">{post.title}</h5></div>
                                            <div className="bg-white my-2 h-28 p-3 rounded-2xl">
                                                <p className="card-text">{post.detail.slice(0, 120)}. . .</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className=" ml-1 bg-black w-fit rounded-lg text-lg"><p className="card-text text-white px-3 py-1" >Author: {post.author}</p></div>
                                            <div className="ml-3 mt-2">Created : {timeSince(post.createdAt)}</div>
                                        </div>
                                        <div className="flex flex-row-reverse">
                                            <Link to={`viewPost/${post._id}`}>
                                                <button type="button" className="btn btn-primary mx-1">
                                                    View More
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row-reverse">
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(index + 1)} className="page-link">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;
