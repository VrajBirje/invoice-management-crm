import React from 'react'
import "./radioButton.css"

export const RadioButton = ({option}) => {
    return (
        <div>
            <p>
                <input type="radio" id="test1" name="radio-group" />
                    <label htmlFor="test1">{option}</label>
            </p>
        </div>
    )
}
