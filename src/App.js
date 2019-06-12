import React from 'react';
import Equaliser from './equalizer/equalizer'
import Uploadbutton from './upload/uploadbutton'
import Infoabouttrack from './upload/infoaboutfile/infoaboutuploadfile'
// import logo from './logo.svg';
import './App.css';
// import { dirname } from 'path';
import sound from './jack.mp3'


class App extends React.Component {
  
  state={
     widthCanvas: 400,
     trackname: "Club",
     tracksize: "3mb",
     tracktype: "mp3" 
    }
  
 
  componentDidMount(){
   
    
  };
  widthMerge=(e)=>{
    console.log(this.state) 
    this.setState({widthCanvas: e.target.value})
  }     
  
  render(){
  return (
    <div className="App">
      <Equaliser width={this.state.widthCanvas} height="200" src={sound} onchange={this.widthMerge}/>
      <Uploadbutton />
      <Infoabouttrack trackname={this.state.trackname} tracksize={this.state.tracksize} tracktype={this.state.tracktype} />
    </div>
  );
  }
}

export default App;
