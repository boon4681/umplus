import { useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../../hooks/useAuth"
import Validator from "../../utils/Validator"
import { UserRegisterValidator, UserUpdateValidator } from "../../validators/auth.validator"
import TextInput from "../../components/TextInput"
import { useAccount } from "../../hooks/useAccount"
import FieldHelper from "../../components/FieldHelper"
import Modal from "../../components/Modal"
import TableHelper from "../../components/TableHelper"
import { Account } from "../../components/AccountProvider"
import { faker } from '@faker-js/faker';

export default () => {
    const { dip } = useAuth()
    const { accounts, create, del, onFetch } = useAccount()
    const [value, setValue] = useState<any>()

    const onClick = async (data: any) => {
        const { validate, errors } = await Validator(UserRegisterValidator, data)
        console.log(errors)
        if (validate) {
            //@ts-ignore
            create(...Object.values(data))
        }
    }

    return (
        <div className="flex flex-col space-y-4 items-center flex-1 h-full">
            <div className="flex justify-end w-full space-x-3">
                <div className="w-full max-w-[140px]">
                    <button
                        onClick={() => {
                            onClick({
                                account_type: 'STUDENT',
                                user_id: faker.datatype.number({ min: 10000, max: 99999 }).toString(),
                               firstname: faker.name.firstName(),
                                lastname: faker.name.lastName(),
                                email: faker.internet.email(),
                                phone_number: faker.phone.number('##########').replace(/-/g, ''),
                                password: '1111111111111',
                                balance: faker.datatype.number({ min: 0, max: 9999 }),
                            })
                        }}
                        className='w-[100%] py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Create Dummy</button>
                </div>
                <div>
                    <Modal name="Create Account">
                        <div className="text-2xl mb-4">Create Account</div>
                        <div className="w-full flex flex-col items-center">
                            <FieldHelper
                                onChange={setValue}
                                type={'fill'} validator={UserRegisterValidator}></FieldHelper>
                            <div className="w-full max-w-sm">
                                <button onClick={() => onClick(value)} className='w-[100%] my-10 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Create</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="h-full pt-3 flex flex-col w-full">
                <div className="text-xl mb-2">Account</div>
                <TableHelper
                    asKey={'user_id'}
                    loading={onFetch}
                    value={accounts}
                    Link={true}
                    validator={UserUpdateValidator}
                    ignore={['setting', 'expense']}
                    editIgnore={['user_id','account_type','balance']}
                    tooltip={
                        [
                            {
                                title: 'Edit',
                                onClick: (data, edit) => {
                                    edit(true)
                                }
                            },
                            {
                                title: 'Delete',
                                className: 'text-rose-500',
                                onClick: (data, edit) => {
                                    if (confirm(`ต้องการลบ ${data.user_id} ใช่หรือไม่`)) {
                                        del(data.user_id)
                                    }
                                }
                            }
                        ]
                    }
                ></TableHelper>
            </div >
        </div >
    )
}