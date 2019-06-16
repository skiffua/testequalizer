

const initialState={  
     widthCanvas: 400,
     
     
     //audiostates
     trackname: "",     
     tracktype: "",
     tracksize: "",     
     audiocontext: "",
     analyser: "",
     audiofromfile: "",
     audionodefromfile: "",
     playpausestate: false

}


export default function rootReducer(state=initialState, action){
    
    switch(action.type){
        case 'createaudiodata':
                         
            return {
                ...state,
                trackname: action.payload.name,
                tracktype: action.payload.type,
                tracksize: action.payload.size,
                // soundSrc: action.payload.file,
                audiocontext: action.payload.context,
                analyser: action.payload.analyser,
                audiofromfile: action.payload.file,
                audionodefromfile: action.payload.audio
                    } 
        case 'playpausesoundfromfile':
            return {
                ...state,
                playpausestate: !(state.playpausestate)
            }  
            case 'mergecanvaswidth':
            return {
                ...state,
                widthCanvas: action.payload
            }          
        default: return state
    }    
}