import Logo from '../components/Logo'
import { RiShutDownLine } from 'react-icons/ri'
import { BiTransferAlt } from 'react-icons/bi'
import { GiTargetDummy } from 'react-icons/gi'
import { FaRandom } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { NavLink } from 'react-router-dom'

export default () => {
    const { user, logout } = useAuth()
    return (
        <div className="bg-[#1F2325] h-full rounded-[36px] px-4 py-4 flex flex-col select-none">
            <Logo className='mx-4 text-white'></Logo>
            <div className='flex flex-col h-full'>
                <div className="mb-auto flex flex-col space-y-4">
                    <NavLink
                        end
                        to="/"
                        className={({ isActive }) =>
                            `flex h-[48px] items-center w-full text-center text-white py-2 rounded-lg cursor-pointer dark-hover bg-hide ${isActive ? 'focus' : ''}`
                        }
                    >
                        <div className='mx-2'><BiTransferAlt className='w-8 h-8' /></div>
                        <div className='w-full'>Transation</div>
                    </NavLink>
                    <div className="text-white/80 px-1">Developer</div>
                    <NavLink
                        to="/dummy"
                        className={({ isActive }) =>
                            `flex h-[48px] items-center w-full text-center text-white py-2 rounded-lg cursor-pointer dark-hover bg-hide ${isActive ? 'focus' : ''}`
                        }
                    >
                        <div className='mx-2'><GiTargetDummy className='w-6 h-6 mx-2' /></div>
                        <div className='w-full'>Create Dummy</div>
                    </NavLink>
                    <NavLink
                        to="/dummy-transaction"
                        className={({ isActive }) =>
                            `flex h-[48px] items-center w-full text-center text-white py-2 rounded-lg cursor-pointer dark-hover bg-hide ${isActive ? 'focus' : ''}`
                        }
                    >
                        <div className='mx-2'><FaRandom className='w-6 h-6 mx-2' /></div>
                        <div className='w-full'>Dummy Transaction</div>
                    </NavLink>
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