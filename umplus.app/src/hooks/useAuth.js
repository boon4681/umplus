import React from "react";
import { AuthContext } from "../components/AuthProvinder";


export const useAuth = () => React.useContext(AuthContext)