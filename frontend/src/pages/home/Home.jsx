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
    const [postsPerPage] = useState(6); 
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
            <div className="bg-black">
                <div className="container">
                    <div className="pl-2 pb-4 rounded-xl ">
                        {user && user.name ? (
                            <div className=" flex justify-around text-2xl text-white font-mono font-bold bg-transperent p-1 ">
                                <div>Welcome, {user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1) + " "}!</div>
                                <div className=" cursor-pointer bg-white text-black w-fit px-2 rounded-md font-mono">Role : {user.role}</div>
                            </div>
                        ) : (
                            <div className=" text-black text-2xl font-semibold bg-transperent p-1">
                                Welcome, Guest!
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col justify-between"> {/* Added this div for centering */}
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-5"> {/* Modified this div */}
                            {currentPosts.map((post) => (
                                <div key={post._id} className="col">
                                    <div className="card h-200 mx-52 w-full border-primary rounded-lg border-white border-3 shadow bg-orange-500">
                                        <div className="card-body flex flex-col justify-between w-full">
                                            <div>
                                                <div className="bg-white  px-4 py-1 text-3xl font-mono rounded-lg text-black">
                                                    <h5 className="card-title">{post.title}</h5>
                                                </div>
                                                <div className="bg-white my-2 font-mono h-28 p-3 rounded-lg">
                                                    <p className="card-text text-black">{post.detail.slice(0, 120)}. . .</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="bg-black font-mono  rounded-lg text-lg text-white px-3 py-1 ">
                                                    Author : {post.author}
                                                </div>
                                                <div className="ml-3 text-black font-mono font-semibold">Created: {timeSince(post.createdAt)}</div>
                                            </div>
                                            <div className="flex justify-end">
                                                <Link to={`viewPost/${post._id}`}>
                                                <button type="button" class="btn btn-primary font-mono mx-1 bg-white text-black">
                                                View More
                                                </button>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-row-reverse">
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button onClick={() => paginate(index + 1)} className="page-link bg-black text-white ">
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
