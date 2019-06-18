var context = new (window.AudioContext || window.webkitAudioContext)();    
var analyser = context.createAnalyser();

const initialState={  
    //graphic canvas 
    widthCanvas: 400,
     
     
     //audiostates
     trackname: "",     
     tracktype: "",
     tracksize: "",     
     audiocontext: context,
     analyser: analyser,
     audiofromfile: "",
     audionodefromfile: "",
     playpausestate: false

}


export default function rootReducer(state=initialState, action){
    
    switch(action.type){
        case 'baseaudiocontextandanaliser':
                         
            return {
                ...state,
                audiocontext: action.payload.context,
                analyser: action.payload.analyser,
                trackname: "sound track"
                    } 
        case 'createaudiodata':                         
            return {
                ...state,
                trackname: action.payload.name,
                tracktype: action.payload.type,
                tracksize: action.payload.size,
                // soundSrc: action.payload.file,                
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
    return state 
}