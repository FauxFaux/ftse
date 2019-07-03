import * as React from "react";
import * as d3 from "d3";
import {Selection} from 'd3-selection';

interface IProps {
  width: number;
  height: number;
}

interface IPoint {
  x: number;
  y: number;
  r: number;
  colour: number;
}

const colours = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847'];

export class Chart extends React.Component<IProps, {}> {
  svgElement: SVGElement | null;

  constructor(props: IProps) {
    super(props);

    this.svgElement = null;
  }

  render() {
    return <div>
      <svg
        width={this.props.width}
        height={this.props.height}
        ref={el => this.svgElement = el}>
      </svg>
    </div>
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    if (null === this.svgElement) {
      return;
    }

    let maxRadius = 40;
    let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width]);
    let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.height]);
    let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius]);

    let u = d3.select(this.svgElement)
      .selectAll('circle')
      .data(getData());

    u.enter()
      .append('circle')
      // @ts-ignore
      .merge(u)
      .attr('cx', (d: IPoint) => xScale(d.x))
      .attr('cy', (d: IPoint) => yScale(d.y))
      .attr('r', (d: IPoint) => rScale(d.r))
      .style('fill', (d: IPoint) => colours[d.colour]);

    u.exit().remove()
  }
}

function getData(): IPoint[] {
  let numItems = 20 + Math.floor(20 * Math.random());
  let data = [];
  for(let i=0; i<numItems; i++) {
    data.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random(),
      colour: i % 5
    })
  }
  return data;
}

