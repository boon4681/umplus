/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            textColor:{
                RaisinBlack:"#1F2325",
                SonicSilver:"#73787B"
            },
            borderColor:{
                RaisinBlack:"#1F2325",
                SonicSilver:"#73787B"
            },
            fontFamily: {
                LINESeedTh: [
                    "LINESeedTh",
                    "sans-serif"
                ],
                LINESeedRg:[
                    "LINESeedRg",
                    "sans-serif"
                ],
                LINESeedHe:[
                    "LINESeedHe",
                    "sans-serif"
                ],
                LINESeedBg:[
                    "LINESeedBg",
                    "sans-serif"
                ],
                LINESeedXBd:[
                    "LINESeedXBd",
                    "sans-serif"
                ]
            }
        },
    },
    plugins: [],
}