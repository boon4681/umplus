import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./Dashboard/Account";
import Transaction from "./Dashboard/Transaction";
import Nav from "../components/Nav";
import Rank from "../components/Rank";
import { AccountProvinder } from "../components/AccountProvider";
import User from "./Dashboard/User";
import { UserProvinder } from "../components/UserProvider";
import Topup from "./Topup/Topup";
import Scan from "./Topup/Scan";
import Store from "./Dashboard/Store";

export default () => {
    return (
        <div className="lg:flex gap-8 w-full h-screen p-8 lg:max-w-[1600px]">
            <Nav></Nav>
            <div className="basis-3/5 white-box p-10 max-w-[60%]" style={{ overflow: 'unset' }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Transaction></Transaction>
                        }>
                    </Route>
                    <Route path="/account">
                        <Route index element={
                            <AccountProvinder>
                                <Account></Account>
                            </AccountProvinder>
                        } />
                        <Route
                            path=":user_id"
                            element={
                                <UserProvinder>
                                    <User></User>
                                </UserProvinder>
                            }>
                        </Route>
                    </Route>
                    <Route path="/topup">
                        <Route index element={
                            <Topup />
                        }></Route>
                        <Route path="scan" element={<Scan />}>

                        </Route>
                        <Route path="multi-topup">

                        </Route>
                    </Route>
                    <Route path="/store" element={
                        <Store></Store>
                    }>
                    </Route>
                </Routes>
            </div>
            <div className="flex flex-col space-y-8 w-[280px]">
                {/* <div>
                    <div className="white-box h-[600px]">
                        <div className="bg-[#1F2325] p-3 text-center text-white">
                            Top expensed
                        </div>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a, b) => {
                                return (
                                    <Rank key={b} rank={{
                                        rank: b + 1,
                                        profile: 'https://media.discordapp.net/attachments/913014856590958623/1031223745265803264/boon4681.png',
                                        id: 32396,
                                        total: 500
                                    }
                                    }></Rank>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="basis-1/5 white-box h-full">

                </div> */}
            </div>
        </div>
    )
}