import React from 'react'

function Infoabouttrack(props) {
    return(
        <details id="detailstrack">
            <summary>Tack name {props.trackname}</summary>
            <p>size is {(props.tracksize/1024/1024).toFixed(2)}МБ</p>
            <p>type is {props.tracktype}</p>
        </details>
    )
}
export default Infoabouttrack