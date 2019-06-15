import React from 'react';
import PlayButton from './playbutton'


function equlizer(props){
    return(
        <div>
            <h1>Equalizer Nice</h1>
            <PlayButton hadlesound={props.hadlesound}/>
            <br />
            <canvas id="graphicequalizer" width={props.width} height={props.height} src={props.src}
                    style={{borderColor: "green", borderWidth: "2px", borderStyle: "solid"}}
            > </canvas> 
            <br />
            <input type="range" min="100" max="1000" step="10" 
                    defaultValue="400" name="rangecanvas" id="range" onChange={props.onchange} />
        </div>    
    )
}

export default equlizer;
