import { memo, useEffect, useState } from 'react'
import * as yup from 'yup'
import Validator from '../utils/Validator'
import TextInput from './TextInput'

enum Cast {
    string = 'text'
}

enum Type {
    string = '',
    number = 0,
    email = ''
}

function FieldHelper<T extends yup.ObjectSchema<any, any>>({
    type,
    validator,
    ignore,
    onChange,
    defaultValue,
    replace
}: {
    type: 'fill' | 'filltable' | 'name',
    defaultValue?: any,
    onChange?: (value: any) => void,
    ignore?: string[],
    validator: T,
    replace?: {
        [key: string]: (props: {
            value: any,
            values: any,
            name: string,
            onChange?: ((value: string) => void),
            error?: string
        }) => JSX.Element;
    }
}) {
    const fields = validator.fields
    const keys = Object.keys(validator.fields).filter(key => !(ignore || []).includes(key))
    let default_value: any = {}
    keys.forEach(key => {
        default_value[key] = Type[fields[key].type]
    })
    const [value, setValue] = useState<any>(defaultValue ? defaultValue : default_value)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const TestError = async () => {
        const { validate, errors } = await Validator(validator, value)
        setErrors(errors)
        return validate
    }
    const data = keys.map(key => {
        //@ts-ignore
        const cast = fields[key].type in Cast ? Cast[key] : fields[key].type

        switch (type) {
            case 'fill':
                return (
                    <div key={key}>
                        {
                            replace && replace[key] ?
                                replace[key]({
                                    value: (cast === 'number') ? value[key].toString() : value[key],
                                    values: value,
                                    name: key.toUpperCase(),
                                    onChange: (e) => {
                                        value[key] = (cast === 'number') ? parseFloat(e) : e
                                        setValue(value)
                                        if (onChange) onChange(value)
                                        TestError()
                                    },
                                    error: errors[key]
                                }) :
                                <TextInput
                                    value={
                                        (cast === 'number') ? value[key].toString() : value[key]
                                    }
                                    name={key.toUpperCase()}
                                    type={cast}
                                    showBoth={true}
                                    onChange={(e) => {
                                        value[key] = (cast === 'number') ? parseFloat(e) : e
                                        setValue(value)
                                        if (onChange) onChange(value)
                                        TestError()
                                    }}
                                    placeholder={key}
                                    error={errors[key]}
                                    size={'sm'}
                                />
                        }
                    </div>
                )
            case 'filltable':
                return (
                    <td key={key} className="px-4 py-2 border-b min-w-[140px]">
                        <TextInput
                            value={
                                (cast === 'number') ? value[key].toString() : value[key]
                            }
                            name={key.toUpperCase()}
                            type={cast}
                            showBoth={true}
                            onChange={(e) => {
                                value[key] = (cast === 'number') ? parseFloat(e) : e
                                setValue(value)
                                if (onChange) onChange(value)
                                TestError()
                            }}
                            placeholder={key}
                            error={errors[key]}
                            size={'xs'}
                        />
                    </td>
                )
            case 'name':
                return (
                    <td key={key} className="px-4 py-2 border-b min-w-[140px]">
                        {key.toUpperCase()}
                    </td>
                )
        }
    })
    switch (type) {
        case 'fill':
            return <div className='flex flex-col max-w-sm w-full space-y-2'>
                {data}
            </div>
        case 'filltable':
            return <>
                {data}
            </>
        case 'name':
            return (
                <tr>
                    {data}
                </tr>
            )
    }
}

export default memo(FieldHelper)