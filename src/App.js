import React from 'react';
import Hark from 'hark'
import Equaliser from './equaliser/equaliser'
import PlayButton from './equaliser/playbutton'
import Uploadbutton from './equaliser/upload/uploadbutton'
import Infoabouttrack from './equaliser/upload/infoaboutfile/infoaboutuploadfile'
import Streambutton from './equaliser/streambutton/streambutton'
import {connect} from 'react-redux'

// import logo from './logo.svg';
import './App.css';

class App extends React.Component {  
   componentDidMount(){ 
      this.detectstreamsoundfrommicrophon();
    }
    
  // createbaseaudiocontextandanaliser=()=>{
  //   var context = new (window.AudioContext || window.webkitAudioContext)();    
  //   var analyser = context.createAnalyser();
  //   this.props.baseaudiocontextandanaliser({context,analyser})
  // }
  
  detectstreamsoundfrommicrophon=()=>{    
    var context = this.props.audiocontext;          
    var audiolinein = new Audio();   
    if (navigator.mediaDevices) {      
      navigator.mediaDevices.getUserMedia ({audio: true})      
      .then((stream)=> {   
        audiolinein.srcObject = stream;
        audiolinein.muted=true;        
          //hark
          var options = {};
          var speechEvents = Hark(stream, options);
          var htmlinfo=document.getElementById("stream_detecting")
      
          speechEvents.on('speaking', function() {           
            htmlinfo.innerHTML=`speaking`
          });
       
          speechEvents.on('stopped_speaking', function() {
            htmlinfo.innerHTML=`no stream detekting`
          });
          var sourcestream = context.createMediaStreamSource(stream);                           
          this.props.createstreamdata({audiolinein,sourcestream})          
      })
      .catch(function(err) {
          console.log('The following gUM error occured: ' + err);
      });
  } else {
     console.log('getUserMedia not supported on your browser!');
  }  
  }  

  widthMerge=(e)=>{   
    this.props.mergecanvaswidth(e)
  }     

  playsoundfromfile=(e)=>{
    var soundfromfile=this.props.audionodefromfile    
    if (this.props.playpausestate===false) {     
      soundfromfile.play();
      this.equaliserrun()
      this.props.playpausesoundfromfile()
    } else {      
      soundfromfile.pause();
      this.props.playpausesoundfromfile();
  }}

  startmutestream =()=>{    
    var audionstream=this.props.audiostream; 
    var context=this.props.audiocontext;
    var analyser=this.props.analyser  
    var sourcestream=this.props.sourcestream
          
    if (this.props.startmutesstate===false) { 
      sourcestream.connect(analyser);
      analyser.connect(context.destination); 
      //play/pause function doesn't work 
      audionstream.play();
      this.equaliserrun()
      this.props.startmutestreamaudio()
    } else { 
      sourcestream.disconnect(analyser);
      audionstream.pause();
      this.props.startmutestreamaudio();
  }
  }

  equaliserrun=(e)=>{   
    var ctx = document.querySelector("canvas").getContext("2d");
    // var ctx=this.props.graphiccontext;
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
    var context=this.props.audiocontext;
    var analyser=this.props.analyser;    
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
        this.props.createaudiodata({audio,file,name:file.name,size: file.size, type:file.type})   
      }  

  render(){   
  return (    
    <div className="App">      
      <Streambutton onclickhandler={this.startmutestream} /><span id="stream_detecting"></span>
      <PlayButton hadlesound={this.playsoundfromfile}/>
      <Equaliser width={this.props.widthCanvas} height="200" onchange={this.widthMerge}/>
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
      baseaudiocontextandanaliser: (data)=>dispatch({type: 'baseaudiocontextandanaliser', payload: data}),
      createaudiodata: (data)=>dispatch({type: 'createaudiodata', payload: data}),  
      playpausesoundfromfile: ()=>dispatch({type: 'playpausesoundfromfile'}),
      createstreamdata: (data)=>dispatch({type: 'createstreamdata', payload: data}),
      startmutestreamaudio: ()=>dispatch({type: 'startmutestteam'}),
      mergecanvaswidth: (e)=>dispatch({type:'mergecanvaswidth', payload: e.target.value})   
  }
}  

export default connect(mapstate, storedispatch)(App)
