import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = user && user.role === "Admin";
    const myClass = `transition-all duration-300 hover:text-gray-600`;

    return (
        <header>
            <div className="bg-black p-2">
                <div className="bg-orange-500 flex justify-between  py-2 navbar border-5  rounded-xl border-black border ">
                    <div className="logo text-black  bg-transperent rounded-sm  pl-8 ">
                        <h3 className="font-bold text-4xl  cursor-pointer">BoomBlogs</h3>
                    </div>
                    <nav className="flex pr-2">
                        <ul className="flex gap-4 font-mono text-xl bg-white rounded-md px-4 py-2">
                            <li className="hover:bg-black hover:text-white rounded-md px-2"><NavLink to="/">Home</NavLink></li>
                            {(isLoggedIn) ? (
                                <>
                                    {isAdmin && (
                                        <>
                                            <li className="hover:bg-black hover:text-white rounded-md px-2"><NavLink to="/admin/viewUsers">View User</NavLink></li>
                                        </>
                                    )}
                                    {isAdmin && (
                                        <>
                                            <li className="hover:bg-black hover:text-white rounded-md px-2">
                                                <NavLink to="/admin/addPost" className=" ">Add Post</NavLink>
                                            </li>
                                            <li className="hover:bg-black hover:text-white rounded-md px-2">
                                                <NavLink to="/admin/yourPosts" className=" ">Your Posts</NavLink>
                                            </li>
                                        </>
                                    )}

                                    <li className="hover:bg-black hover:text-white rounded-md px-2"><NavLink to="/logout">Logout</NavLink></li>
                                </>
                            ) : (
                                <>
                                    <li className="hover:bg-black hover:text-white rounded-md px-2"><NavLink to="/register">Register</NavLink></li>
                                    <li className="hover:bg-black hover:text-white rounded-md px-2"><NavLink to="/login">Login</NavLink></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
