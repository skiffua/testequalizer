import React from 'react';
import Equaliser from './equalizer'
// import logo from './logo.svg';
import './App.css';
// import { dirname } from 'path';
import sound from './jack.mp3'


class App extends React.Component {
  
  state={widthCanvas: 400}
  
 
  componentDidMount(){
   
    function start(){
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = context.createAnalyser();
  
    var ctx = document.querySelector("canvas").getContext("2d");
    var flagColorColumn=true;
  
    var numPoints = analyser.frequencyBinCount-80;
    var heightArray = new Uint8Array(numPoints);
  
    function render() {
      analyser.getByteFrequencyData(heightArray);
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      var countcolumns=Math.floor(ctx.canvas.width/52);
      var columnwidth=Math.floor(7/8*ctx.canvas.width/52)
      ctx.clearRect(0, 0, width, height);
      for (var x =0; x < width; x += countcolumns) {
         var ndx = x * numPoints / width | 0;
         var vol = heightArray[ndx];
         var y = vol * height / 512;            
         roundedRect(ctx, x, height/2, columnwidth, y, 3)     
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
      ctx.fillStyle =flagColorColumn ? '#1ecea8' : '#93969f';
      flagColorColumn =!flagColorColumn;
      ctx.fill();      
    }  
  
     // Make a audio node
    var audio = new Audio();
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
      console.log(e.toString());
    });
    audio.src = sound
    audio.play();    
  }
  var clickElem = document.querySelector("button");
      clickElem.addEventListener('click', function() {
      clickElem.style.display = 'none';
      start();
    });
  // var rangeElement=document.getElementById('range');
  //     rangeElement.addEventListener('change', function(e){
  //     console.log(widthMerge.call(App))
  //     // console.log(this.state)
  //     // this.setState={widthCanvas:100}
  //     }
  //     )
    
 
  };
  widthMerge=(e)=>{
    console.log(this.state) 
    this.setState({widthCanvas: e.target.value})
  }     
  
  render(){
  return (
    <div className="App">
      <Equaliser width={this.state.widthCanvas} height="200" src={sound} onchange={this.widthMerge}/>
      
    </div>
  );
  }
}

export default App;
