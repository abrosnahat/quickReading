import React from 'react';
import cn from 'classnames';


import './App.scss';

let text = ["Hello!", "If", "you", "copy", "and", "paste", "the", "text", "here", "you", "will", "gain", "the", "ability", "to", "read",  "quickly", "😊"];
let i = 0;

class App extends React.Component {
  state = { data: 'Insert text', hide: false, speed: 250 };

  textareaText = (e) => text = e.target.value.split(' ');

  chengeState = () => this.timerI = setInterval(() => {
    (i < text.length - 1) ? i += 1 : this.clearIntervals(); 
  }, this.state.speed);

  start = () => {
    if (text.length !== 0) {
      this.chengeState();
      this.timerStart = setInterval(
        () => this.setState({ data: text[i].replace(/[\s.,%]/g, ''), hide: true }),
        0
      );
    } else {
      this.setState({ data: 'Need to insert text', hide: false })
    }
    
  }

  clearIntervals = () => {
    clearInterval(this.timerStart);
    clearInterval(this.timerI);
    this.setState({ hide: false })
    i = 0;
  }

  pause = () => {
    clearInterval(this.timerStart);
    clearInterval(this.timerI);
    this.setState({ hide: false })
  }

  restart = () => {
    this.clearIntervals();
    this.start();
  }

  hideTextarea = () => {
    this.setState({ hide: true })
  }

  updateSpeed = (e) => {
    this.setState({ speed: e.target.value })
  }

  render() {
    const textareaClass = cn({
      textarea: true,
      hide: this.state.hide 
    });

    const rangeClass = cn({
      range: true,
      hide: this.state.hide 
    });

    const rangeSpanClass = cn({
      "range-span": true,
      hide: this.state.hide 
    });

    const buttonsMargin = this.state.hide ? {marginTop: '345px'} : null;
    const placeholder = `Hello! If you copy and paste the text here, you will gain the ability to read quickly 😊`;

    return (
      <>
        <div className="word">
            {this.state.data}
        </div>
        <textarea onChange={this.textareaText} className={textareaClass} placeholder={placeholder} />
        <span className={rangeSpanClass}>{(1000 / this.state.speed).toFixed(2)}  words/sec</span>
        <input type="range" className={rangeClass} onChange={this.updateSpeed} defaultValue={250} min={100} max={500} />
        <div className="buttons" style={buttonsMargin}>
          {!this.state.hide ? (
            <button className={"button"} onClick={this.start}>Start</button>
          ) : (
            <button className="button" onClick={this.pause}>Pause</button>
          )}
          <button className="button" onClick={this.restart}>Restart</button>
        </div>
      </>
    )
  }
}

export default App;
