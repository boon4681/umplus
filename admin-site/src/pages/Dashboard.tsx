import { FC } from "react";
import Nav from "../components/Nav";
import Rank from "../components/Rank";

export default () => {
    return (
        <div className="grid grid-cols-5 gap-8 w-full h-screen p-8 max-w-[1440px]">
            <Nav></Nav>
            
            <div className="col-span-3 white-box">
                
            </div>
            <div className="flex flex-col space-y-8">
                <div>
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
                <div className="white-box h-full">

                </div>
            </div>
        </div>
    )
}