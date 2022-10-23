import Logo from '../components/Logo'
import { RiShutDownLine } from 'react-icons/ri'
import { BiTransferAlt } from 'react-icons/bi'
import { useAuth } from '../hooks/useAuth'

export default () => {
    const { user,logout } = useAuth()
    return (
        <div className="bg-[#1F2325] h-full rounded-[36px] px-4 py-4 flex flex-col select-none">
            <Logo className='mx-4 text-white'></Logo>
            <div className='flex flex-col h-full'>
                <div className="mb-auto">
                    <div className="flex items-center dark-hover w-full text-center text-white py-2 rounded-lg cursor-pointer">
                        <div className='mx-2'><BiTransferAlt className='w-8 h-8' /></div>
                        <div className='w-full'>Transition</div>
                    </div>
                </div>
                <div className='flex w-full text-[#DCDCDC] m-2'>
                    <div className="dark-hover p-2 rounded-lg mr-4 cursor-pointer" onClick={logout}>
                        <div><RiShutDownLine className='w-7 h-7'></RiShutDownLine></div>
                    </div>
                    <div className='w-full'>
                        <div>{user?.name}</div>
                        <div className='text-sm'>Admin-1</div>
                    </div>
                </div>
            </div>
        </div>
    )
}