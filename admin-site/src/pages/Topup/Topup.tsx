import { AiOutlineCamera } from "react-icons/ai"
import { ImStack } from 'react-icons/im'
import { NavLink } from "react-router-dom"


export default () => {
    return (
        <div className="flex justify-center items-center space-x-8 h-full">
            <div className="flex justify-center space-x-8 w-full">
                <NavLink to="scan" className="aspect-square max-w-[300px] max-h-[300px] w-full rounded-xl shadow-1 p-6 flex flex-col items-center cursor-pointer transition hover:-translate-y-2">
                    <div className="aspect-square h-full">
                        <AiOutlineCamera className="w-full h-full text-[#3455FF]/60"></AiOutlineCamera>
                    </div>
                    <div className="text-2xl">
                        Scan QRCode
                    </div>
                    <div className="text-xl">
                        เติมผ่าน qrcode
                    </div>
                </NavLink>
                <NavLink to="multi" className="aspect-square max-w-[300px] max-h-[300px] w-full rounded-xl shadow-1 p-6 flex flex-col items-center cursor-pointer transition hover:-translate-y-2">
                    <div className="aspect-square h-full">
                        <ImStack className="w-full h-full p-[10%] text-[#3455FF]/60"></ImStack>
                    </div>
                    <div className="text-2xl">
                        MultiTopup
                    </div>
                    <div className="text-xl">
                        เติมเท่ากันทีละหลายคน
                    </div>
                </NavLink>
            </div>
        </div>
    )
}