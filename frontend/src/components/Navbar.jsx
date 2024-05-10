import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = user && user.role === "Admin";
    const myClass = `transition-all duration-300 hover:text-gray-600`;

    return (
        <header>
            <div className="bg-orange-500 flex justify-between px-5 py-3 navbar border-5">
                <div className="logo text-black  bg-transperent rounded-sm   ">
                    <h3 className="font-bold text-xl  cursor-pointer">BoomBlogs</h3>
                </div>
                <nav className="flex pr-16">
                    <ul className="flex gap-4 font-bold text-xl">
                        <li className={myClass}><NavLink to="/">Home</NavLink></li>
                        {(isLoggedIn) ? (
                            <>
                                {isAdmin && <li className="dropdown">
                                    <span className={`${myClass} cursor-pointer`}>User</span>
                                    <ul className="dropdown-content bg-gray-200 border-2 shadow-md border-gray-600">
                                        <li className=""><NavLink to="/admin/viewUsers">View User</NavLink></li>
                                    </ul>
                                </li>}
                                {isAdmin &&<li className="dropdown">
                                <span className={`${myClass} cursor-pointer`}>Posts</span>
                                    <ul className="dropdown-content bg-gray-200 border-2 shadow-md border-gray-600">
                                        <li className=""><NavLink to="/admin/addPost">Add Post</NavLink></li>
                                        <li className=""><NavLink to="/admin/yourPosts">Your Posts</NavLink></li>
                                    </ul>
                                </li>}
                                <li className={myClass}><NavLink to="/logout">Logout</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li className={myClass}><NavLink to="/register">Register</NavLink></li>
                                <li className={myClass}><NavLink to="/login">Login</NavLink></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
