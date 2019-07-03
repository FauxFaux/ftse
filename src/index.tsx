import * as React from "react";
import * as ReactDOM from "react-dom";
import {Chart} from './chart';

interface IRecord {
  day: string;
  low: number;
  high: number;
  open: number;
  close: number;
  volume: number | null;
}

interface IAppState {
  raw: IRecord[];
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { raw: [] };
  }

  componentDidMount() {
    fetch("../raw.tsv")
      .then(res => res.text())
      .then(res => {
        const raw = [];
        for (const line of res.split('\n')) {
          if (line.trim().length === 0) {
            continue;
          }
          const [day, low, high, open, close, volume] = line.split('\t');

          if ('None' === low) {
            // non-trading days
            continue;
          }

          raw.push({
            day,
            low: parseInt(low),
            high: parseInt(high),
            open: parseInt(open),
            close: parseInt(close),
            volume: 'None' !== volume ? parseInt(volume) : null});
        }
        raw.shift(); // header
        this.setState({raw});
      })
  }

  render() {
    return <div>
      <Chart width={800} height={400}/>
      <pre>{JSON.stringify(this.state.raw)}</pre>
    </div>
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app"),
);
