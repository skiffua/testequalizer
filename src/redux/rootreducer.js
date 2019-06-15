

const initialState={  
    widthCanvas: 400,
     trackname: "",     
     tracktype: "",
     tracksize: "", 
     soundSrc: ""
}


export default function rootReducer(state=initialState, action){
    
    console.log('action',action)
    switch(action.type){
        case 'uploasoundinfo': {
            
        return {
            ...state,
            trackname: action.payload.name,
            tracktype: action.payload.type,
            tracksize: action.payload.size,
        }};
        default: return state
    }    
}