import React from "react";
import { UserContext } from "../components/UserProvider";


export const useUser = () => React.useContext(UserContext)
