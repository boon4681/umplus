import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import Validator from "../utils/Validator";
import { UserRegisterValidator } from "../validators/auth.validator";

export interface Account {
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

export interface AccountContextType {
    accounts: Account[],
    create: (
        account_type: string,
        user_id: string,
        firstname: string,
        lastname: string,
        email: string,
        phone_number: string,
        password: string,
        balance: number,
    ) => Promise<
        {
            errors: Record<string, string> | null,
            data: any | null
        }>,
    del: (user_id: string) => void,
    onFetch: boolean
}

export const AccountContext = React.createContext<AccountContextType>({} as AccountContextType)

export const AccountProvinder: FC<JSX.IntrinsicElements['div']> = (
    {
        children
    }
) => {
    const { dip } = useAuth()
    const [accounts, setAccounts] = useState<Account[]>([])
    const [onFetch, setOnFetch] = useState(true)

    const load = async () => {
        if (!dip) return;
        const accounts = await dip?.fetch('/api/admin/account/users', 'POST')
        if (accounts) {
            setAccounts(accounts || [])
            setOnFetch(false)
        }
    }

    const create = async (
        account_type: string,
        user_id: string,
        firstname: string,
        lastname: string,
        email: string,
        phone_number: string,
        password: string,
        balance: number,
    ) => {
        const { validate, errors } = await Validator(UserRegisterValidator, { account_type, user_id, firstname, lastname, email, phone_number, password, balance })
        if (validate) {
            const res = await await dip?.fetch('/api/admin/account/create', 'POST', {
                data: { account_type, user_id, firstname, lastname, email, phone_number, password, balance }
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
            return { errors, data: res }
        }
        return { errors, data: null }
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
        <AccountContext.Provider
            value={{
                accounts,
                create,
                del,
                onFetch
            }}
        >
            {children}
        </AccountContext.Provider>
    )
}