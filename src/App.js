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
    console.log(this.state) 
    this.setState({widthCanvas: e.target.value})
  }     
  
  render(){
    console.log(this.props)
  return (
    
    <div className="App">
      <Equaliser width={this.props.widthCanvas} height="200" src={sound} onchange={this.widthMerge}/>
      <Uploadbutton />
      <Infoabouttrack trackname={this.props.trackname} tracksize={this.props.tracksize} tracktype={this.props.tracktype} />
    </div>
  );
  }
}
function mapstate(state){
  return state
}

export default connect(mapstate)(App)
