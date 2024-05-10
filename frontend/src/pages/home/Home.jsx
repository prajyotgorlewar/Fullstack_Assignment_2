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
            <div className="bg-black">
                <div className="container">
                    <div className="pl-2 pb-4 pr-96 rounded-xl ">
                        {user && user.name ? (
                            <div className=" flex justify-around text-2xl text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-300 p-2 rounded-lg">
                                <div>Welcome, {user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1) + " "}!</div>
                                <div className=" cursor-pointer bg-white text-black w-fit px-2 rounded-md">Role : {user.role}</div>
                            </div>



                        ) : (
                            <div className=" text-black text-2xl font-semibold bg-gradient-to-r from-orange-500 to-orange-300 p-2 rounded-lg ">
                                Welcome, Guest!
                            </div>
                        )}
                    </div>
                    
                   
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-4 mx-auto">
    {currentPosts.map((post) => (
        <div key={post._id} class="col">
            <div class="card h-100 w-fit border border-primary rounded-lg shadow bg-gradient-to-br from-orange-500 to-orange-300">
                <div class="card-body flex flex-col justify-between">
                    <div>
                        <div class="bg-black  px-4 py-1 text-3xl rounded-lg text-white">
                            <h5 class="card-title">{post.title}</h5>
                        </div>
                        <div class="bg-black my-2 h-28 p-3 rounded-lg">
                            <p class="card-text text-white">{post.detail.slice(0, 120)}. . .</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="bg-black  rounded-lg text-lg text-white px-3 py-1">
                            Author: {post.author}
                        </div>
                        <div class="ml-3 text-black">Created: {timeSince(post.createdAt)}</div>
                    </div>
                    <div class="flex justify-end">
                        <Link to={`viewPost/${post._id}`}>
                            <button type="button" class="btn btn-primary mx-1 bg-orange-300 hover:bg-white text-black border-black border hover:border-white">
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
