import React from 'react'


function Infoabouttrack(props) {
    return(
        <details id="detailstrack">
            <summary>Tack name {props.trackname}</summary>
            <p>size is {props.tracksize}</p>
            <p>type is {props.type}</p>
        </details>

    )
}

export default Infoabouttrack