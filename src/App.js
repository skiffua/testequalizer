import React from 'react';
import Equaliser from './equalizer/equalizer'
import Uploadbutton from './upload/uploadbutton'
import Infoabouttrack from './upload/infoaboutfile/infoaboutuploadfile'
import {connect} from 'react-redux'

// import logo from './logo.svg';
import './App.css';
// import { dirname } from 'path';
import sound from './jack.mp3'


class App extends React.Component {
   
 
  componentDidMount(){   
    
  };
  widthMerge=(e)=>{
    console.log('old state',this.state) 
    this.setState({widthCanvas: e.target.value})
  }     

  playsoundfromfile=(e)=>{   
    var context = new (window.AudioContext || window.webkitAudioContext)();
    this.props.creataudiocontext(context)
    
    var analyser = context.createAnalyser();
    this.props.createanaliser(analyser);

    var audio = new Audio();
    this.props.createaudionodefromfile(audio)
        audio.loop = true;
        audio.autoplay = true;
        audio.crossOrigin = "anonymous";

        audio.addEventListener('canplay', function() {
          try {
            var source = context.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(context.destination);
          } catch (e) {
            console.log(e.toString());
          }
        });
        audio.addEventListener('error', function(e) {
          console.log(e.toString(),'ERORA');
        });
        audio.src = URL.createObjectURL(this.props.soundSrc)
        audio.play ? audio.play(): audio.pause();    
    //   }
  }
  
  render(){
    
  return (
    
    <div className="App">
      <Equaliser width={this.props.widthCanvas} height="200" onchange={this.widthMerge} hadlesound={this.playsoundfromfile}/>
      <Uploadbutton />
      <Infoabouttrack trackname={this.props.trackname} tracksize={this.props.tracksize} tracktype={this.props.tracktype} />
    </div>
  );
  }
}
function mapstate(state){
  return state
}
function storedispatch(dispatch){
  return {
      creataudiocontext: (e)=>dispatch({type: 'creataudiocontext', payload: e}),
      createanaliser: (e)=>dispatch({type: 'createanaliser', payload: e}),
      createaudionodefromfile: (e)=>dispatch({type: 'createaudionodefromfile', payload: e})
  }
}  

export default connect(mapstate, storedispatch)(App)
