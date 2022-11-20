import { memo, ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import useOnClickOutside from '../hooks/useOnClickOutside'
import Validator from '../utils/Validator'
import { Account } from './AccountProvider'
import FieldHelper from './FieldHelper'
import Loading from './Loading'
import TextInput from './TextInput'


function Item({
    value,
    ignore,
    onClick,
    edit,
    validator,
    Link
}: {
    ignore?: string[],
    edit: boolean,
    value: any,
    validator: yup.ObjectSchema<any, any>,
    onClick: (data: any, e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void,
    Link?: string
}) {
    const navigator = useNavigate()
    const field_keys = Object.keys(validator.fields).filter(key => !(ignore || []).includes(key))
    const keys = Object.keys(value).filter(key => field_keys.includes(key))
    if (!edit) {
        const data = keys.map((key, i) => {
            return (
                <td key={key} data-name={key} className="px-4 py-2">
                    {value[key]}
                </td>
            )
        })
        return (
            <>
                <tr
                    onContextMenu={(e) => {
                        e.preventDefault()
                        onClick(value, e)
                    }}
                    onClick={() => {
                        if (Link)
                            navigator(Link)
                    }}
                    className={`rounded-2xl cursor-pointer hover:bg-[#F1F3F4] opacity-80 hover:opacity-100`}>
                    {
                        data
                    }
                </tr>
            </>
        )
    } else {
        return <tr
            onContextMenu={(e) => {
                e.preventDefault()
                onClick(value, e)
            }}
            className={`rounded-2xl cursor-pointer hover:bg-[#F1F3F4] opacity-80 hover:opacity-100`}
        >
            <FieldHelper type={'filltable'} validator={validator} defaultValue={value} ignore={ignore} />
        </tr>
    }
}

const MemoItem = memo(Item)

type TooltipOption = { title: string, onClick: (data: any, setEdit: (e: any) => void, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void } | React.HTMLAttributes<HTMLElement>

function TableHelper<T, K extends yup.ObjectSchema<any, any>>(
    {
        value,
        ignore,
        validator,
        tooltip,
        asKey,
        loading,
        CustomItem,
        Link
    }:
        {
            ignore?: string[],
            value: T[],
            loading?: boolean,
            asKey: keyof T,
            validator: K,
            tooltip?: TooltipOption[],
            CustomItem?: any,
            Link?: boolean
        }
) {
    const [pos, setPos] = useState({ left: 0, top: 0 })
    const [data, setData] = useState<T>({} as T)
    const [selectedItem, setSelectedItem] = useState<Map<T[keyof T], { edit: boolean }>>(new Map())
    const tooltip_ref = useRef(document.createElement('div'))
    const onClick = (data: T, e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        setData(data)
        if (!selectedItem.has(data[asKey])) {
            selectedItem.set(data[asKey], { edit: false })
            setSelectedItem(selectedItem)
        }
        const box = e.currentTarget.getBoundingClientRect()
        setPos({
            left: e.clientX,
            top: box.height / 2 + box.top - tooltip_ref.current.getBoundingClientRect().height / 2
        })
        tooltip_ref.current.style.display = 'flex'
    }
    const setEdit = (e: boolean) => {
        if (e) {
            selectedItem?.set(data[asKey], { edit: true })
            setSelectedItem(selectedItem)
        } else {
            selectedItem?.delete(data[asKey])
            setSelectedItem(selectedItem)
        }
    }
    useOnClickOutside(tooltip_ref, (e) => {
        tooltip_ref.current.style.display = 'none'
    })
    if (loading) {
        return (
            <div className="rounded-lg shadow-1 w-full h-full flex flex-col">
                <div className="w-full overflow-y-scroll overflow-x-auto relative" style={{ flex: '1 1 0' }}>
                    <div className="w-full text-left text-[15px]">
                        <table>
                            <thead>
                                <FieldHelper type={'name'} ignore={['password']} validator={validator}></FieldHelper>
                            </thead>
                        </table>
                        <Loading></Loading>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="rounded-lg shadow-1 w-full h-full flex flex-col">
            <div ref={tooltip_ref} className='tooltip' style={{ ...pos, display: 'none' }}>
                <div className="spike"></div>
                <div className="inner">
                    {
                        !selectedItem?.get(data[asKey])?.edit ?
                            tooltip?.map(v => {
                                //@ts-ignore
                                return <div
                                    {...v}
                                    key={v.title}
                                    onClick={(e) => {
                                        if (v.onClick) v.onClick(data, setEdit, e)
                                        tooltip_ref.current.style.display = 'none'
                                    }}
                                    //@ts-ignore
                                    className={`option ` + (v?.className || '')}
                                >{v.title}</div>
                            })
                            : <>
                                {/* <div
                                    onClick={() => {
                                        setEdit(false)
                                        tooltip_ref.current.style.display = 'none'
                                    }}
                                    className={`option`}
                                >
                                    Save
                                </div> */}
                                <div
                                    onClick={() => {
                                        setEdit(false)
                                        tooltip_ref.current.style.display = 'none'
                                    }}
                                    className={`option`}
                                >
                                    Cancel
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="w-full overflow-y-scroll overflow-x-auto relative" style={{ flex: '1 1 0' }}>
                <table className="w-full text-left text-[15px]">
                    <thead className='sticky top-0 bg-white shadow-border-b'>
                        <FieldHelper type={'name'} ignore={['password']} validator={validator}></FieldHelper>
                    </thead>
                    <tbody className="space-y-2">
                        {
                            value.map((value) => {
                                if (CustomItem) {
                                    return <CustomItem key={value[asKey] + ''} value={value}></CustomItem>
                                }
                                return <MemoItem Link={Link ? value[asKey] + '' : undefined} validator={validator} edit={selectedItem.get(value[asKey])?.edit || false} onClick={onClick} key={value[asKey] + ''} value={value} ignore={ignore}></MemoItem>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableHelper