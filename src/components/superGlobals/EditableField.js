import React, { useRef, useEffect, useState, useContext } from 'react'
import axios from 'axios'

import AppContext from '@context/AppContext'

const EditableField = (props) => {
    const input = useRef()
    const context = useContext(AppContext)
    const [focus, setFocus] = useState(false)
    const [inputValue, setInputValue] = useState(props.value)

    const dataFilter = {
        className: (props.className !== undefined) ? props.className : '',
        mode: (props.mode !== undefined) ? props.mode : 'dark',
        tag: (props.tag) ? props.tag : 'div',
        textfield: (props.textfield) ? props.textfield : 'input',
        type: (props.type) ? props.type : 'text'
    }

    const className = {
        focused: `editable-field is-active ${dataFilter.mode} ${dataFilter.className}`,
        noFocused: `editable-field ${dataFilter.mode} ${dataFilter.className}`,
    }

    const query = (data) => {
        axios.put(
            'http://localhost:3333/list/edit/' + props.dataTable + '/' + props.datafield + '/' + props.dataId,
            {
                value: data
            }
        ).then((response) => context.app.insertApiResponse(response.data.query_name))
        setFocus(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.which === 13) query(inputValue)
    }

    useEffect(() => {
        if (focus) {
            input.current.select()
            input.current.focus()
        }
    }, [focus])

    const el = (props.render !== undefined) ?
        React.cloneElement(props.render, [props], inputValue) :
        <dataFilter.tag className={'editable-field__value '}>{inputValue}</dataFilter.tag>
        
    return (
        <div className={(focus) ? className.focused : className.noFocused} onClick={() => setFocus(true)}>
            {el}
            <dataFilter.textfield
                type={dataFilter.type}
                name={props.value}
                ref={input}
                defaultValue={props.value}
                onChange={event => setInputValue(event.target.value)}
                onBlur={() => query(inputValue)}
                onKeyPress={handleKeyPress}
                className="editable-field__input" />
        </div>
    )
}

export default EditableField