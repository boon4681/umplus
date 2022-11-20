import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import Validator from "../utils/Validator";
import { UserRegisterValidator } from "../validators/auth.validator";

export interface User {
    account_type: string,
    user_id: string,
   firstname: string,
    lastname: string,
    email: string,
    phone_number: string,
    balance: number,
    expense: number,
    setting: any
}

export interface UserContextType {
    user: User,
    del: (user_id: string) => void,
    onFetch: boolean
}

export const UserContext = React.createContext<UserContextType>({} as UserContextType)

export const UserProvinder: FC<JSX.IntrinsicElements['div']> = (
    {
        children
    }
) => {
    const { dip } = useAuth()
    let { user_id } = useParams()
    const [user, setUser] = useState<User>({} as User)
    const [onFetch, setOnFetch] = useState(true)

    const load = async () => {
        if (!dip) return;
        const _user = await dip?.fetch('/api/admin/account/users/' + user_id, 'POST')
        if (_user) {
            if(_user != user){
                setUser(_user)
                setOnFetch(false)
            }
        }
    }

    const del = async (user_id: string) => {
        const res = await dip?.fetch('/api/admin/account', 'DELETE', {
            data: { user_id }
        })
        if (res) {
            if (res.code == 200) {
                toast.success(`🍌 ${res.message}`, {
                    position: "top-center",
                    theme: 'dark',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(`🍌 ${res.message}`, {
                    position: "top-center",
                    theme: 'dark',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }
    useEffect(() => {
        const i = setInterval(() => {
            load()
        }, 1000)
        load()
        return () => clearInterval(i)
    }, [])
    return (
        <UserContext.Provider
            value={{
                user,
                del,
                onFetch
            }}
        >
            {children}
        </UserContext.Provider>
    )
}