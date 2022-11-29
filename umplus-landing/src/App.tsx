import { useState } from 'react'

function App() {
    const [on, setON] = useState(false)

    return (
        <div className="w-full relative" style={{ backgroundImage: 'url(BG.svg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className='max-w-lg flex flex-col w-full mx-auto px-5'>
                <div className='text-8xl mx-auto mt-40'>
                    umplus
                </div>
                <div className='text-4xl text-center mx-auto mt-20 text-[#325776]'>
                    มิติใหม่ของ E-wallet สำหรับโรงเรียน
                </div>
                <button
                    onClick={() => {
                        window.location.href = 'https://workspace.boon4681.com/download/umplus-app.apk'
                    }}
                    className="w-full shadow-xl sm:w-auto flex bg-[#1c1d1e] hover:bg-[#1c1d1e]/95 focus:ring-4 focus:ring-gray-500 text-white rounded-xl items-center justify-center px-4 py-4 mt-10 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    {/* <svg className="mr-3 w-9 h-9" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play"
                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                        </path>
                    </svg> */}
                    <svg className="mr-3 w-9 h-9" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.91 199l42.47-73.57a8.63 8.63 0 00-3.12-11.76 8.52 8.52 0 00-11.71 3.12l-43 74.52c-32.83-15-69.78-23.35-109.52-23.35s-76.69 8.36-109.52 23.35l-43-74.52a8.6 8.6 0 10-14.88 8.64L131 199C57.8 238.64 8.19 312.77 0 399.55h512c-8.19-86.78-57.8-160.91-131.09-200.55zM138.45 327.65a21.46 21.46 0 1121.46-21.46 21.47 21.47 0 01-21.46 21.46zm235 0A21.46 21.46 0 11395 306.19a21.47 21.47 0 01-21.51 21.46z"></path></svg>
                    <div className="text-left">
                        <div className="mb-1 text-xl">Available for Android Now!</div>
                    </div>
                </button>
                <div className='w-full lg:h-screen lg:overflow-hidden pt-20 mb-20 lg:mb-0' style={{
                    filter: 'drop-shadow(-11px 23px 50px rgba(69, 115, 154, 0.47)) drop-shadow(-42px 121px 134px rgba(94, 142, 185, 0.87))'
                }}>
                    <img className='w-full' src='/mockup.svg' />
                </div>
            </div>
            <div
                onClick={() => setON(!on)}
                className='fixed cursor-pointer hover:bg-black/80 right-0 bottom-0 w-10 h-10 bg-black rounded-md text-white flex justify-center items-center m-5'>
                <div>?</div>
                <div className='relative flex'>
                    <div className={`absolute transform transition-all ease-out ${on ? '-translate-x-8 right-0 scale-100 opacity-100' : 'translate-x-0 right-[-200px] scale-0 opacity-0'} -translate-y-12 bg-black px-5 py-4 rounded-md shadow-md`}>
                        <div className='text-center text-md py-3 whitespace-nowrap' >
                            ©{`2022${(new Date()).getFullYear() != 2022 ? '-' + new Date().getFullYear() : ''}`} Passwich Thongruang, boon4681.
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default App
