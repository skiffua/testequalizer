import React from 'react'
import {connect} from 'react-redux'


function Uploadbutton (props){
    
    return(
        <label > Виберіть трек для завантаження 
        <input type="file" id="soundsource" accept="audio/mp3" onChange={props.handleinfofromsound} />
        </label>
    )
}

function mapstate(state){
    return state
  }

function storedispatch(dispatch){
    return {
        uploadsoundinfo: (e)=>dispatch({type: 'uploadsoundinfo', payload: e.target.files[0]})
    }
  }  

export default connect(mapstate, storedispatch)(Uploadbutton);