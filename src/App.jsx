import React from 'react';
import cn from 'classnames';

import './App.scss';

let text = ["Привет!", "Если", "скопируешь", "и", "вставишь", "сюда", "текст,", "то", "обретешь", "способность", "быстро", "читать", ":)"];
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

    const buttonsMargin = this.state.hide ? {marginTop: '497px'} : null;
    const placeholder = `Привет! Если скопируешь и вставишь сюда текст, то обретешь способность быстро читать :)`;

    return (
      <>
          <h1 className="word">
            {
              this.state.data
            }
          </h1>
          <textarea onChange={this.textareaText} className={textareaClass} placeholder={placeholder} />
          <span className={rangeSpanClass}>{(1000 / this.state.speed).toFixed(2)}  с/сек</span>
          <input type="range" className={rangeClass} onChange={this.updateSpeed} defaultValue={250} min={100} max={500} />
          <div className="buttons" style={buttonsMargin}>
            {!this.state.hide ? (
              <button className={"button"} onClick={this.start}>Старт</button>
            ) : (
              <button className="button" onClick={this.pause}>Пауза</button>
            )}
            <button className="button" onClick={this.restart}>Рестарт</button>
          </div>
      </>
    )
  }
}

export default App;
