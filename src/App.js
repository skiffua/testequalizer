import React from 'react';
import Equaliser from './equalizer'
// import logo from './logo.svg';
import './App.css';
// import { dirname } from 'path';
import sound from './jack.mp3'


class App extends React.Component {
  componentDidMount(){
   
    function start(){
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = context.createAnalyser();
  
    var ctx = document.querySelector("canvas").getContext("2d");
    var flagColorColumn=true;
  
    var numPoints = analyser.frequencyBinCount;
    var heightArray = new Uint8Array(numPoints);
  
    function render() {
      analyser.getByteFrequencyData(heightArray);
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      ctx.clearRect(0, 0, width, height);
      for (var x =0; x < width; x += 10) {
         var ndx = x * numPoints / width | 0;
         var vol = heightArray[ndx];
         var y = vol * height / 255;    
        //  ctx.fillStyle = flagColorColumn ? '#1ecea8' : '#93969f';
        //  flagColorColumn =!flagColorColumn;
          
         roundedRect(ctx, x, height/2, 10, y+3, 3)
        //  roundedRect(ctx, x, height/2, 10, -y, 3)

        //  ctx.fillRect(x, height/2, 10, y);
        //  ctx.fillRect(x, height/2, 10, -y);
      }    
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
    function roundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.strokeStyle = 'orange';
     
      context.lineWidth = 1;     
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + height - radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);
      ctx.lineTo(x + width - radius, y + height);
      ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
      ctx.lineTo(x + width, y);
      // ctx.lineTo(x + radius, y);
      // /actx.closePath();
      ctx.fillStyle =flagColorColumn ? '#1ecea8' : '#93969f';
      flagColorColumn =!flagColorColumn;
      ctx.fill();
      ctx.strokeStyle = 'orange';
      ctx.stroke();
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
    // console.log(clickElem)
    clickElem.addEventListener('click', function() {
      clickElem.style.display = 'none';
      start();
    });
  }

  render(){
  return (
    <div className="App">
      <figure  >
        <figcaption>Listen to the Calvin Harris:</figcaption>
        <audio id="rootAudio" controls src={sound}>                
        </audio>
      </figure>
      <Equaliser width="600" height="200" src={sound}/>
    </div>
  );
  }
}

export default App;
