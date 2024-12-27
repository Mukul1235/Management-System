import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";



export const useAuth = () => useContext(AuthContext);    //it Will export the context

