import React from 'react';

import './App.css';

const text = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
let i = 0;
const chengeState = () => setInterval(() => i++, 250);

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { data: text[0] };
  }

  start = async () => {
    chengeState();
    this.timerID = await setInterval(
      () => this.setState({ data: text[i] }),
      0
    );
  }

  stop = () => {
    clearInterval(this.timerID);
    i = 0;
  }

  render() {
    return (
      <div>
          <h1>
            {
              this.state.data
            }
          </h1>
          <button onClick={this.start}>Старт</button>
          <button onClick={this.stop}>Стоп</button>
      </div>
    )
  }
}

export default App;
