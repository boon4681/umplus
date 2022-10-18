import Logo from '../components/Logo'

export default () => {
    return (
        <div className='min-h-screen flex flex-col justify-center '>
            <div className='mx-auto w-[300px] bg-white p-8 px-8 rounded-[20px] justify-center shadow-lg shadow-gray-500/50'>
                <div className=''>
                    <Logo className='text-black text-xs'></Logo>
                </div>
                <div className='flex flex-col text-black py-2'>
                    <label className='text-xl'>Username</label>
                    <input className='rounded-lg bg-white mt-2 p-2 border-2 border-gray-500 ' type="username" />
                </div>
                <div className='flex flex-col text-black py-2 ' >
                    <label className='text-xl'>Password</label>
                    <input className='rounded-lg bg-white mt-2 p-2 border-2 border-gray-500 ' type="password" />
                </div>
                <button className='w-[100%] my-10 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-lg shadow-gray-500/80 rounded-lg'>Login</button>
            </div>
        </div>
    )
}