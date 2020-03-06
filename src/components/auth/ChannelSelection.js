import React from 'react'

const ChannelSelection = (props) => {

    console.log(props.socket)

    const handleSubmit = (event) => {
    }

    return (
        <div className="w-100 h-100 flex-column-center">
            <h2 className="font-l-700 text-uppercase mb-m">Choisissez votre canal</h2>
            <form className="flex-row-center" onSubmit={handleSubmit}>
                <span className="mr-m">/</span>
                <input type="text" className="textfield rounded w-50"></input>
            </form>
        </div>
    )
}

export default ChannelSelection