import React, { ReactChild, useState, useRef, useEffect, FC, ReactNode } from 'react'

const Modal = ({ children,name }: { children: ReactNode,name: string }) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <button onClick={() => setShow(true)} className='w-full max-w-sm px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>{name}</button>
            {
                show ?
                    <div>
                        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center pt-6 z-50">
                            <div onClick={() => setShow(false)} className='bg-black/20 w-full h-full absolute top-0 left-0'></div>
                            <div className="bg-white w-full max-w-md h-[80vh] overflow-auto p-6 rounded-lg shadow-sm relative">
                                {children}
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}
export default Modal