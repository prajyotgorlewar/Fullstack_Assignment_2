import { NavLink } from "react-router-dom";
import "./Error.css"
const Error=()=>{

    return(
        <>
        <div className="bg-gray-400 py-4">
        <section id="error-page">
            <div className="container">
                <h2 className="header">404</h2>
                <h4>Sorry! Page not found</h4>
                <p>Oops! It seems like the page you're trying to access
                    doesn't exist
                </p>
            </div>
        </section>
        </div>
        </>
    )
}


export default Error;