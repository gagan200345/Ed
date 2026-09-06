import { createContext, useContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get token from LocalStorage
  const [token, setToken] = useState(localStorage.getItem("token"));
  //berer token ko authorization ma daal diya because isko hum context api pa dalenge waha sa adminuser use karnge
const authorizationToken =  `Bearer ${token}`;


  // Store token
  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };


  // Currently logged-in user
  const [user, setUser] = useState(null);

  //service
  const [services, setServices] = useState([]);

  // Get current user from backend
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const getUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/user",
          {
            method: "GET",
            headers: {
              Authorization: authorizationToken ,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          console.log("user data:", data.userData);

          setUser(data.userData);
        } else {
          console.log("Failed to fetch user");
          setUser(null);
        }
      } catch (error) {
        console.log("User authentication error:", error);
        setUser(null);
      }
    };

    getUser();
  }, [token,authorizationToken]);


//service page backend to frontend call
 // Get services from backend
  useEffect(() => {
  const getServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/service"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();

      console.log("Services data:", data);

      setServices(data.services);
    } catch (error) {
      console.log("SERVICES FRONTEND ERROR:", error);
    }
  };

  getServices();
}, []);


  return (
    <AuthContext.Provider value={{storeTokenInLocalStorage,token,logoutUser,user,services,authorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of AuthProvider");
  }

  return authContextValue;
};