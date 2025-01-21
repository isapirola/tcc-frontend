import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const useAuth = () => {
  const { setUser } = useContext(UserContext)!;
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLogged(false);
  };

  return { isLogged, handleLogout };
};

export default useAuth;
