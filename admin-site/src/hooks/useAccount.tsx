import React from "react";
import { AccountContext } from "../components/AccountProvider";


export const useAccount = () => React.useContext(AccountContext)
