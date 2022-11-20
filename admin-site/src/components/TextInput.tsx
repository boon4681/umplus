import { ReactNode, useEffect, useState } from "react"
import useID from "../hooks/useID"


export default (props: {
    name: string,
    onChange?: (value: string) => void,
    value?: string,
    error?: string,
    showName?: boolean,
    showBoth?: boolean,
    placeholder?: string,
    size?: string,
    icon?: ReactNode,
    readonly?: boolean,
    className?: string,
    disable?: boolean,
    type?: string,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
}) => {
    const id = useID(props.name)
    const [value, setValue] = useState((props.value == undefined) ? "" : props.value)

    useEffect(() => {
        if (props.onChange)
            props.onChange(value)
    }, [value])

    return (
        <>
            <div className={props.className}>
                <div className="relative">
                    <label className={`block text-xs font-medium text-gray-500 ${props.showName || props.showBoth ? '' : 'sr-only'}`} htmlFor={id}> {props.name} </label>
                    <input
                        id={id}
                        value={value}
                        onChange={(e) => {
                            setValue(e.currentTarget.value)
                        }}
                        onKeyDown={(e) => {
                            if (props.onKeyDown)
                                props.onKeyDown(e)
                        }}
                        className={`w-full ${props.size ? props.size == "sm" ? 'p-2' : props.size == 'xs' ? 'p-1' : 'p-4' : 'p-4'} ${props.icon ? 'pr-12' : ''} text-sm ${props.error ? 'border-rose-500 error' : 'border-gray-200'} rounded-lg shadow-sm bg-white border-2 border-gray-500`}
                        type={props.type || "text"}
                        readOnly={props.readonly}
                        placeholder={(props.showName || props.showBoth) ? props.showBoth ? props.placeholder : '' : props.placeholder || ""}
                        disabled={props.disable}
                    />
                    {
                        props.icon ? (
                            <span className={`absolute inset-y-0 inline-flex items-center ${props.size === 'sm' ? 'top-4' : ''} right-4`}>
                                {props.icon}
                            </span>
                        ) : ""
                    }
                </div>
                {
                    props.error && <p className="block text-xs font-semibold mt-1 ml-2 text-rose-500">{props.error}</p>
                }
            </div>
        </>
    )
}