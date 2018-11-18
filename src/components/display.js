import React from 'react';

class Display extends React.Component {
  
    render() { 
      let minutes = this.props.minutes;
      let seconds = this.props.seconds;
      if (minutes < 10) {
        minutes = `0${minutes}`;
      } else if (minutes === 0) {
        minutes = '00';
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      } else if (seconds === 0) {
        seconds = '00';
      }
      let icon = <i className='fas fa-play'></i>;
      if (this.props.mode === 'started') {
        icon = <i className="fa fa-pause"></i>;
      } else {
        icon = <i className='fas fa-play'></i>;
      }
      return(
        <div className="display">
          <h2 id="timer-label">{this.props.state}</h2>
          <p id="time-left">{`${minutes}:${seconds}`}</p>        
          <div className="controls">
            <button id="start_stop" onClick={this.props.start_pause}>            
              {icon}  
            </button>
            <button id="reset" onClick={this.props.reset}>
              <i className='fas fa-redo-alt'></i>
            </button>
          </div>
        </div>
      )
    }
  }

  export default Display;