import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getUserData } from "../api";
import { UserData } from "../interfaces";

const useAuth = () => {
  const { user, setUser } = useContext(UserContext)!;
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleUserDataContext = async (userToEdit?: UserData) => {
    if (userToEdit) {
      const userData = {
        id: userToEdit._id,
        name: userToEdit.name,
        email: userToEdit.email,
      };
      setUser(userData);
    } else {
      const response = await getUserData();
      const userData = {
        id: response._id,
        name: response.name,
        email: response.email,
      };
      setUser(userData);
    }
  };

  useEffect(() => {
    if (isLogged && !user) {
      handleUserDataContext();
    }
  }, [isLogged, user]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLogged(false);
  };

  return { isLogged, handleLogout, handleUserDataContext };
};

export default useAuth;
