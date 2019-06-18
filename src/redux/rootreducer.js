var context = new (window.AudioContext || window.webkitAudioContext)();    
var analyser = context.createAnalyser();

// var ctx = document.querySelector("canvas").getContext("2d");

const initialState={  
    //graphic canvas 
    widthCanvas: 400,
    // graphiccontext: ctx, 
     
     //audiostates
     trackname: "",     
     tracktype: "",
     tracksize: "",     
     audiocontext: context,
     analyser: analyser,
     audiofromfile: "",
     audiostream: "",
     audionodefromfile: "",
     playpausestate: false,
     startmutesstate: false

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
        case 'createstreamdata':
            return {
                ...state,
                audiostream: action.payload
                }      
        case 'startmutestteam':
                return {
                    ...state,
                    startmutesstate: !(state.startmutesstate)
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