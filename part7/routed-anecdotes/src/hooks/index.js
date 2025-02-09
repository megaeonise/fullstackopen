import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
        console.log(value)
    }

    const reset = (event) => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}