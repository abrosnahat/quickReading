import React from 'react';
import cn from 'classnames';

import './App.scss';

// const text = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
let text = [];
let i = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'Вставьте текст', hide: false, speed: 250 };
  }

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
      this.setState({ data: 'Нужно вставить текст', hide: false })
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

    return (
      <div>
          <h1 className="word">
            {
              this.state.data
            }
          </h1>
          <textarea onChange={this.textareaText} className={textareaClass} />
          <span className={rangeSpanClass}>{this.state.speed}</span>
          <input type="range" className={rangeClass} onChange={this.updateSpeed} onChangeComplete={this.updateSpeed} defaultValue="250" min="100" max="500" />
          <div className="buttons">
            {!this.state.hide ? (
              <button className={"button"} onClick={this.start}>Старт</button>
            ) : (
              <button className="button" onClick={this.pause}>Пауза</button>
            )}
            <button className="button" onClick={this.restart}>Рестарт</button>
          </div>
      </div>
    )
  }
}

export default App;
