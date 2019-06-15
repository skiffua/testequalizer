

const initialState={  
     widthCanvas: 400,     
     trackname: "",     
     tracktype: "",
     tracksize: "", 
     soundSrc: "",
     audiocontext: "",
     analyser: "",
     audiofromfile: "",
    //  audiocontext: "",
    //  createanaliser: "",
    //  createaudionodefromfile: ""

}


export default function rootReducer(state=initialState, action){
    
    switch(action.type){
        case 'uploadsoundinfo':             
            return {
                ...state,
                trackname: action.payload.name,
                tracktype: action.payload.type,
                tracksize: action.payload.size,
                soundSrc: action.payload
                    }
        
        case 'creataudiocontext':               
            return {
                ...state,
                audiocontext: action.payload   
        }
        case 'createanaliser':            
            return {
                ...state,
                analyser: action.payload
            }
        case 'createaudionodefromfile':            
            return {
                ...state,
                audiofromfile: action.payload
            };

        default: return state
    }    
}