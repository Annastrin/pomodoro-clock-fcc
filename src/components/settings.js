import React from 'react';

class Settings extends React.Component {
  
    render() {
      return (
        <div className="settings">
          <div id="break-label">
            <p className="setting-name">Break Length</p>
            <div className="break-settings">
              <button id="break-decrement" className="break-btn" onClick={this.props.decreaseBreak}>
                <i className='fas fa-minus'></i>
              </button>
              <p id="break-length" className="setting-value">{this.props.break}</p>
              <button id="break-increment" className="break-btn" onClick={this.props.increaseBreak}>
                <i className='fas fa-plus'></i>
              </button>
            </div>
          </div>
          <div id="session-label">
            <p className="setting-name">Session Length</p>
            <div className="session-settings">
              <button id="session-decrement" className="session-btn" onClick={this.props.decreaseSession}>
                <i className='fas fa-minus'></i>
              </button>
              <p id="session-length" className="setting-value">{this.props.session}</p>
              <button id="session-increment" className="session-btn" onClick={this.props.increaseSession}>
                <i className='fas fa-plus'></i>
              </button>
            </div>
          </div>
        </div>
      )
    }  
  }

  export default Settings;