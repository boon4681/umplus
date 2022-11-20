import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { memo, useEffect } from "react";
import 'prismjs/components/prism-json'
import 'prism-themes/themes/prism-ghcolors.css'
import { User } from "../../components/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import TableHelper from "../../components/TableHelper";
import Avatar from "boring-avatars";

export default () => {
    const { user, del, onFetch } = useUser()
    const navigate = useNavigate()
    if (onFetch) return <Loading></Loading>
    return (
        <div className="flex flex-col space-y-4 items-center flex-1 h-full">
            <div className="flex justify-end w-full space-x-3">
                <div>
                    <button onClick={() => {
                        if (confirm(`ต้องการลบ ${user} ใช่หรือไม่`)) {
                            del(user.user_id)
                        }
                    }} className='w-[100%] px-4 py-2 bg-rose-500 hover:bg-rose-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Delete Account</button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            navigate('/account')
                        }}
                        className='w-[100%] min-w-[120px] px-4 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Back</button>
                </div>
            </div>
            <div className="w-full flex-col">
                <div className="mr-auto text-3xl">
                    {`ชื่อ: ${user.firstname} ${user.lastname}`}
                </div>
                <div className="flex space-x-4 items-center">
                    <div>
                        <Avatar
                            size={100}
                            name={`u${user.user_id}`}
                            variant="beam"
                            colors={['#FF5252', '#FF7752', '#FF9A52', '#FFB752', '#5E405B']}
                        />
                    </div>
                    <div>
                        <div className="my-4">
                            <div className="text-xl">เงินที่มี: {user.balance} บาท</div>
                            <div className="text-xl">ใช้จ่ายไป: {user.expense} บาท</div>
                        </div>
                        <div>
                            <div className="text-xl">เบอร์โทรศัพท์: {user.phone_number}</div>
                            <div className="text-xl">email: {user.email}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full pt-3 flex flex-col w-full">
                <MemoJSONCode user={user}></MemoJSONCode>
            </div>
        </div>
    )
}

const JSONCode = ({ user }: { user: User }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, [user]);
    return (
        <pre className="shadow-1 rounded-xl">
            <code className={`language-json`}>{JSON.stringify(user, null, 4)}</code>
        </pre>
    )
}

const MemoJSONCode = memo(JSONCode)