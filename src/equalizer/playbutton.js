import React from 'react'
import {connect} from 'react-redux'

function PlayButton(props){
    props.test();

    return(
        <button onClick={props.playsoundfromfile}>
             Play
        </button>
    )
}

function mapstate(state){
    return state
  }

function storedispatch(dispatch){
    return {
        playsoundfromfile: ()=>dispatch({type: 'playsoundfromfile'}),
        test: ()=>dispatch({type: 'consolee'})
    }
  }  

export default connect(mapstate, storedispatch)(PlayButton)