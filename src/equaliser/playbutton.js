import React from 'react'
import {connect} from 'react-redux'

function PlayButton(props){
    return(
        <button onClick={props.hadlesound}>
             Play
        </button>
    )
}

function mapstate(state){
    return state
  }

export default connect(mapstate)(PlayButton)