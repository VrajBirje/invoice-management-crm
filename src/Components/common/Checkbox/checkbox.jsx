import React from 'react'
import "./checkbox.css"

export const Checkbox = ({ checked, onChange }) => {
    return (
        <>
            <label className="containerCheckbox">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span className="checkmark"></span>
            </label>
        </>
    )
}
