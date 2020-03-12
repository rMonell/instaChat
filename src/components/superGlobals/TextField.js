import React, { useRef, useState } from 'react'

const TextField = (props) => {
    const [formInputClassName, setformInputClassName] = useState('form-input')
    const input = useRef()

    const dataFilter = {
        type: (props.type) ? (props.type) : 'text',
        tagName: (props.tagName) ? props.tagName : 'input',
        className: (props.className) ? formInputClassName + ' ' + props.className : formInputClassName,
        name: (props.name) ? props.name : 'textFieldName',
        label: (props.label) ? props.label : 'TextField label here',
        value: (props.value) ? props.value : ''
    }

    return (
        <div className={dataFilter.className}>
            <label htmlFor={dataFilter.name}>{dataFilter.label}</label>

            <dataFilter.tagName
                onFocus={() => setformInputClassName('form-input is-focused')}
                onBlur={() => input.current.value === '' && setformInputClassName('form-input')}
                name={props.name}
                type={dataFilter.type}
                ref={input}
                defaultValue={dataFilter.value}
                className="textfield"
                onChange={props.onChange}
                onClick={props.onClick}
                required={props.required} />
        </div>
    )
}

export default TextField