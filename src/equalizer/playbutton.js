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

function storedispatch(dispatch){
    return {
        creataudiocontext: ()=>dispatch({type: 'creataudiocontext'}),
        createanaliser: ()=>dispatch({type: 'createanaliser'}),
        createaudionodefromfile: ()=>dispatch({type: 'createaudionodefromfile'})
    }
  }  

export default connect(mapstate, storedispatch)(PlayButton)