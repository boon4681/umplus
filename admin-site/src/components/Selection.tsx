import { useEffect, useRef, useState } from "react"
import useID from "../hooks/useID"

type options = string[]

export default (props: {name: string, className?: string, value?: string, error?: string, disabled?: boolean, onChange?: (value: string) => void, options: options, showName?: boolean }) => {
    const [selected, setSelected] = useState(props.value || "")
    const id = useID(props.name)
    useEffect(() => {
        if (props.onChange && selected !== props.value && selected !== "")
            props.onChange(selected)
    }, [selected])
    useEffect(() => {
        setSelected(props.value || "")
    }, [props.value])
    return (
        <div className={props.className}>
            <label className={`block text-xs font-medium text-gray-500 ${props.showName ? '' : 'sr-only'}`} htmlFor={id}> {props.name} </label>
            <select
                id={id}
                value={selected}
                disabled={props.disabled}
                onChange={(e) => setSelected(e.currentTarget.value)}
                className={`text-sm w-full max-w-[240px] ${props.error ? 'border-rose-500 error' : 'border-gray-200'} rounded-lg shadow-sm`}
            >
                {
                    !selected ? <option value={selected}>ไม่ได้เลือก</option> :
                        <option value={props.value}>{props.value}</option>
                }
                {
                    props.options.filter(a => a !== selected).map(a => {
                        return (
                            <option key={a} value={a}>{a}</option>
                        )
                    })
                }
            </select>
            {
                props.error && <p className="block text-xs font-semibold mt-1 ml-2 text-rose-500">{props.error}</p>
            }
        </div>
    )
}