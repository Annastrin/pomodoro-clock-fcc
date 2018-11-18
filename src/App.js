import React from 'react';
import Settings from './components/settings.js';
import Display from './components/display.js';
import './App.css';

let timer = null;
let defaultState = {
  session: 25,
  break: 5,      
  mode: 'off',
  state: 'session',
  leftMinutes: 25,
  leftSeconds: 0
};

class Pomodoro extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {...defaultState}    
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.increaseSession = this.increaseSession.bind(this);    
    this.reset = this.reset.bind(this);   
    this.setTimer = this.setTimer.bind(this);
    this.playSound = this.playSound.bind(this);
    this.start_pause = this.start_pause.bind(this);
  }
  
  decreaseBreak() {        
    let curSettingVal = this.state.break;
    if (this.state.mode === 'off' && curSettingVal > 1) {
      this.setState({
        break: curSettingVal - 1
      });
    } else if (this.state.mode === 'off' && curSettingVal <= 1) {
      this.setState({
        break: curSettingVal
      });
    } else {}      
  }     
  
  increaseBreak() {    
    let curSettingVal = this.state.break;
    if (this.state.mode === 'off' && curSettingVal < 60) {
      this.setState({
        break: curSettingVal + 1
      });
    } else if (this.state.mode === 'off' && curSettingVal >= 60) {
      this.setState({
        break: curSettingVal
      });
    } else {}
  }
  
  decreaseSession() {        
    let curSettingVal = this.state.session;
    if (this.state.mode === 'off' && curSettingVal > 1) {
      this.setState({
        session: curSettingVal - 1,
        leftMinutes: curSettingVal - 1
      });
    } else if (this.state.mode === 'off' && curSettingVal <= 1) {
      this.setState({
        session: curSettingVal,
        leftMinutes: curSettingVal
      });
    } else {}   
  }
  
  increaseSession() {    
    let curSettingVal = this.state.session;
    if (this.state.mode === 'off' && curSettingVal < 60) {
      this.setState({
        session: curSettingVal + 1,
        leftMinutes: curSettingVal + 1
      });
    } else if (this.state.mode === 'off' && curSettingVal >= 60) {
      this.setState({
        session: curSettingVal,
        leftMinutes: curSettingVal
      });
    } else {}    
  }  
  
  reset() {
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    clearInterval(timer);
    this.setState({...defaultState});     
  }  
  
  setTimer() {
    this.setState({
        mode: 'started'
      });
    // this funcs helps to update state inside of inner function
    let updateLeftTime = (min, sec) => {
      this.setState({
        leftMinutes: min,
        leftSeconds: sec
      }); 
    }
    let updateSBState = (state) => {            
      this.setState(
        {
          state: state === 'session'?'break':'session',
          mode: 'paused'
        }, () => updateLeftTime(
          this.state.state==='session'?this.state.session:this.state.break, seconds
        )  
      );      
    };     
    
    let minutes = this.state.leftMinutes;
    let seconds = this.state.leftSeconds;    
    let timeInSec = minutes * 60 + seconds;
    
    // start timer
    let timerOn = () => {        
      let timeLeft = timeInSec - 1;   
      this.playSound(timeLeft);
      if (timeLeft >= 0) {
        minutes = Math.floor(timeLeft / 60);
        seconds = timeLeft % 60; 
        updateLeftTime(minutes, seconds);
        timeInSec = timeLeft;
      } else {   
        clearInterval(timer);            
        updateSBState(this.state.state);         
        this.setTimer();
      }         
      
    };
    timer = setInterval(timerOn, 1000);
  }
  
  playSound(time) {
    if (time === 0) {
      this.audioBeep.play();
    }
  }
  
  start_pause() {  
    if (this.state.mode === 'off') {                   
      this.setTimer();        
    } else if (this.state.mode === 'started') {      
      this.setState({
        mode: 'paused'
      });       
      clearInterval(timer);      
    } else if (this.state.mode === 'paused') {
      this.setTimer();      
    } 
    
  }
  
  render() {
    return (
      <div className="pomodoro">
        <h1>Pomodoro Clock</h1>
        <Settings decreaseBreak={this.decreaseBreak} increaseBreak={this.increaseBreak} decreaseSession={this.decreaseSession} increaseSession={this.increaseSession} break={this.state.break} session={this.state.session}/>  
        <Display mode={this.state.mode} state={this.state.state} minutes={this.state.leftMinutes} seconds={this.state.leftSeconds} reset={this.reset} start_pause={this.start_pause}/>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>
    )
  }
}

export default Pomodoro;