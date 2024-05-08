import { useState } from "react";
import controlImage from './../../assets/image.png';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SideBarNav = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(true); // State to track sidebar expand/collapse

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const publicMenuList = [
        { title: "Login", to: "/" },
        { title: "Register", to: "/" },
    ];

    return (
        <div className="flex">
            <div className={`w-96 bg-gray-800  ${isExpanded ? '' : 'hidden'} transition-all duration-500`}>
                <div className="h-96 bg-white m-8 rounded-xl p-4 ">
                    {/* Menu Items */}
                    <ul className='m-2'>
                        {publicMenuList.map((item, index) => (
                            <li key={index} className="flex gap-1 p-2  bg-white text-gray-800 border-2 border-gray-800 group hover:bg-gray-800 hover:text-white font-bold rounded-md mt-3 transition-all duration-300">
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                    
                </div>   
            </div>  
            <div
                onClick={toggleSidebar} 
                className="flex items-center justify-center border-r-2 border-white bg-gray-800 text-gray-800 font-bold w-10 p-2 h-full cursor-pointer mt-auto transition-all duration-300">
                {isExpanded ? (
                    <img src={controlImage} alt="Control" style={{ transform: 'rotate(180deg) transition-all duration-300' }} />
                ) : (
                    <img src={controlImage} alt="Control" />
                )}
            </div>         
        </div>
        
    );
};

export default SideBarNav;
