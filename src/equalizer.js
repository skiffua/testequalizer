import React from 'react';


function equlizer(props){
    return(
        <div>
            <h1>Equalizer Nice</h1>
            <button>
             Click to Start
            </button>
            <canvas id="graphicequalizer" width={props.width} height={props.height} src={props.src}
                    style={{borderColor: "green", borderWidth: "2px", borderStyle: "solid"}}
            > </canvas> 
        </div>    
    )
}

export default equlizer;
