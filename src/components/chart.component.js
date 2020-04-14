import React, { Component } from 'react';
import * as d3 from 'd3'

class Charts extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     data: props.datalist
        // }

        this.data = props.datalist;
        this.month = props.month;
        this.year = props.year;
    }

    componentDidMount() {
        this.drawChart();
    }

    getAmount(item) {
        return item.amount;
    }

    drawChart() {
        const amount = this.data.map(this.getAmount);
        const svg = d3.select(this.refs.pie).append("svg").attr("width", 700).attr("height", 300);
        svg.selectAll("rect")
  .data(amount)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 70)
  .attr("y", 0)
  .attr("width", 25)
  .attr("height", (d, i) => d)
  .attr("fill", "green");
    }
    
    render() {
        return(
        <div className="pie_chart">
            <h1>Expenses Summary</h1>
            <div className="show_year_month">
                <span>YEAR: {this.year == '0' ? 'All' : this.year}</span>
                <span>MONTH: {this.month == '0' ? 'All' : this.month}</span>
            </div>
            <div ref="pie"></div>
        </div>
        )
    }
}
export default Charts;