"use client"
import React, { useState, ChangeEvent } from 'react'

interface Props {
    placeholder: string
    value:string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
function InputText({ placeholder,value,onChange }: Props) {

    // const [textValue, setTextValue] = useState("")

    // const hasTextValue = textValue.length > 0;
    const hasTextValue = value.length > 0;

    // const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTextValue(e.target.value)
    // }


    return (
        <label className={` relative border border-dark-gray rounded-lg  h-9  px-2  block`}>
            <span className={`absolute text-dark-gray ${hasTextValue ? "scale-75 translate-y-[-0.225rem] left-0" : "top-[50%] translate-x-1 translate-y-[-50%]"}`}>{placeholder}</span>
            <input
                className={`border-none focus:outline-0 tracking-wider bg-transparent text-sm pl-0.5 ${hasTextValue ? "pt-3 pb-0.5" : "pt-2"}`}
                // maxLength={16}
                // onChange={e => handleChangeText(e)}
                onChange={onChange}
                value={value.toString()}
            />
        </label>

    )
}

export default InputText

