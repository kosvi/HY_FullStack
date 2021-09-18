import React from 'react'

const PersonAdder = ({nameAdder, newName, nameChanger, newNumber, numberChanger}) => {
    return (
        <form>
        {/*<form onSubmit={nameAdder}>*/}
        <div>
                name: <input value={newName} onChange={nameChanger} />
            </div>
            <div>
                number: <input value={newNumber} onChange={numberChanger} />
            </div>
            <div>
                <button onClick={nameAdder}>add</button>
            </div>
        </form>
    )
}

export default PersonAdder