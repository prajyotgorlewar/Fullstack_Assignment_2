import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext= createContext();



export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [user, setUser] = useState('');
    const authorizationToken=`${token}`;

    
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    }

    //JWT AUTHENTICATION - to get currently loggedIN userDATA

    const userAuthentication= async()=>{
        try {
            const response = await fetch("http://localhost:3000/api/auth/user",
             {
                method:"GET",
                headers:{
                    Authorization:authorizationToken

                },
             }   
            );
            if(response.ok){
                const data= await response.json();
                console.log("user Data",data.userData)
                setUser(data.userData);
            }

        } catch (error) {
            console.error("Error fetching user Data");
        }
    }

    useEffect(() => {
        if (token) {
            userAuthentication();
        }
    }, [token]);
    
    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn ,user ,authorizationToken}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth=()=>{
    const authContextValue= useContext(AuthContext);
    if(!authContextValue){
        throw new Error(`useAuth used outside of the Provider`);
    }
    return authContextValue;
};