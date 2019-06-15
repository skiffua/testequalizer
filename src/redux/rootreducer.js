

const initialState={  
     widthCanvas: 400,     
     trackname: "",     
     tracktype: "",
     tracksize: "", 
     soundSrc: "",
     audiocontext: "",
     analyser: "",
     audiofromfile: "",
     audiocontext: "",
     createanaliser: "",
     createaudionodefromfile: ""

}


export default function rootReducer(state=initialState, action){
    
    console.log('action',action)
    switch(action.type){
        case 'uploadsoundinfo': {            
            return {
                ...state,
                trackname: action.payload.name,
                tracktype: action.payload.type,
                tracksize: action.payload.size,
                soundSrc: action.payload
                    }
        };
        case 'creataudiocontext':{
            var context = new (window.AudioContext || window.webkitAudioContext)();   
            return {
                ...state,
                audiocontext: context
            }

        };
        case 'createanaliser':{            
            return {
                ...state,
                createanaliser: createanaliser
            }

        };
        case 'createaudionodefromfile':{            
            return {
                ...state,
                createaudionodefromfile: createaudionodefromfile
            }

        };




        default: return state
    }    
}