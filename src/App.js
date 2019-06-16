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
    this.props.mergecanvaswidth(e)
  }     

  playsoundfromfile=(e)=>{
    var soundfromfile=this.props.audionodefromfile
    console.log(this.props.playpausestate)
    if (this.props.playpausestate==false) {
      console.log('+++++')
      soundfromfile.play();
      this.equaliserrun()
      this.props.playpausesoundfromfile()
    } else {     
      console.log('-----') 
      soundfromfile.pause();
      this.props.playpausesoundfromfile();
  }}
  equaliserrun(){
    var ctx = document.querySelector("canvas").getContext("2d");
    var flagColorColumn=true;
    var analyser=this.props.analyser
    var numPoints = analyser.frequencyBinCount-80;
    var heightArray = new Uint8Array(numPoints);
    function render() {
      analyser.getByteFrequencyData(heightArray);
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      var countcolumns=Math.floor(ctx.canvas.width/52);
      var columnwidth=Math.floor(5/6*ctx.canvas.width/52);
      
      ctx.clearRect(0, 0, width, height);
      for (var x =0; x < width; x += countcolumns) {
         var ndx = x * numPoints / width | 0;
         var vol = heightArray[ndx];
         var y = vol * height / 512;            
         roundedRect(ctx, x, height/2, columnwidth, y, 2)          
      }    
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
    function roundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x, y-height);
      ctx.lineTo(x, y +height - radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);
      ctx.lineTo(x + width - radius, y + height);
      ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
      ctx.lineTo(x + width, y-height+radius);
      ctx.arcTo(x + width, y-height, x+width-radius, y - height, radius);
      ctx.lineTo(x +radius, y-height);
      ctx.arcTo(x, y - height, x, y - height+radius, radius);
      // ctx.stroke();
      ctx.fillStyle =flagColorColumn ? '#1ecea8' : '#93969f';
      flagColorColumn =!flagColorColumn;
      ctx.fill();      
    } 
    
  }

  uploadsoundinfofromfile=(e)=>{  
    const file=e.target.files[0]    
    var context = new (window.AudioContext || window.webkitAudioContext)();    
    var analyser = context.createAnalyser();
    var audio = new Audio();   
        audio.loop = true;       
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
        audio.src = URL.createObjectURL(file)
        this.props.createaudiodata({context,analyser,audio,file,name:file.name,size: file.size, type:file.type})   
      }
  

  render(){
    
  return (
    
    <div className="App">
      <Equaliser width={this.props.widthCanvas} height="200" onchange={this.widthMerge} hadlesound={this.playsoundfromfile}/>
      <Uploadbutton handleinfofromsound={this.uploadsoundinfofromfile}/>
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
      createaudiodata: (data)=>dispatch({type: 'createaudiodata', payload: data}),  
      playpausesoundfromfile: ()=>dispatch({type: 'playpausesoundfromfile'}),
      mergecanvaswidth: (e)=>dispatch({type:'mergecanvaswidth', payload: e.target.value})   
  }
}  

export default connect(mapstate, storedispatch)(App)
