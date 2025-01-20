import { useState, useEffect } from "react";

const useAuth = () => {
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
    setIsLogged(false);
  };

  return { isLogged, handleLogout };
};

export default useAuth;
