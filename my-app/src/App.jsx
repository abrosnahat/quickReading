import React from 'react';
import cn from 'classnames';

import './App.css';

// const text = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
let text = [];
let i = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: 'Вставьте текст', hide: false };
  }

  handleChange = (e) => text = e.target.value.split(' ');

  chengeState = () => this.timerI = setInterval(() => {
    if (i < text.length - 1) {
      i += 1;
    } else {
      this.stop();
    }
    
  }, 250);

  start = async () => {
    if (text.length !== 0) {
      this.stop();
      this.chengeState();
      this.timerStart = await setInterval(
        () => this.setState({ data: text[i].replace(/[\s.,%]/g, '') }),
        0
      );
    }
    this.setState({ data: 'Нужно вставить текст' })
  }

  stop = () => {
    clearInterval(this.timerStart);
    clearInterval(this.timerI);
    this.setState({ hide: false })
    i = 0;
  }

  hideTextarea = () => {
    this.setState({ hide: true })
  }

  render() {
    const classNames = cn({
      textarea: true,
      hide: this.state.hide 
    })

    return (
      <div>
          <h1>
            {
              this.state.data
            }
          </h1>
          <textarea onChange={this.handleChange} className={classNames}></textarea>
          <button className="button" onClick={() => {this.start(); this.hideTextarea()}}>Старт</button>
          <button className="button" onClick={this.stop}>Стоп</button>
      </div>
    )
  }
}

export default App;
