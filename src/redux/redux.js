// import {createStore} from 'react-redux';
const redux = require('redux')

//default state
const initialState={  
    widthCanvas: 400,
     trackname: "Club",
     tracksize: "3mb",
     tracktype: "mp3", 
     soundSrc: ""
}

//reducer
const reducer=(state=initialState, action)=> {
    if (action.type==='addSoundSrc'){
    return {
        ...state,
        soundSrc: "soundSRC"
    }}
    return state
}

//store
const store=redux.createStore(reducer)
store.subscribe(()=>console.log('state',store.getState()))
// console.log(store.getState())

//actions
const addSoundSrc={
    type: 'addSoundSrc'
}
store.dispatch(addSoundSrc)