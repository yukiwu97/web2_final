import React, { Component } from 'react';
import * as d3 from 'd3'

class Charts extends Component {
    constructor(props) {
        super(props);

        this.data = props.datalist;
        this.month = props.month;
        this.year = props.year;
        this.total = 0;
    }

    componentDidMount() {
        this.drawChart();
    }

    getClassifiedData() {
        var countMap = {};
        var retList = [];
        var total = 0;
        this.data.forEach(item => {
            countMap[item.category] ? 
                (countMap[item.category] = countMap[item.category] + item.amount) : 
                (countMap[item.category] = item.amount);
            total = total + item.amount;
        });
        this.total = total;
        for (var category in countMap) {
            var count = countMap[category];
            var percentage = (count / total) * 100;
            retList.push({"name": category, "count": count.toFixed(2), "percentage" : percentage.toFixed(2)})
        }
        return retList;
    }

    drawChart() {
        const classifiedData = this.getClassifiedData();
        console.log(this.data);
        console.log(classifiedData);
        const svgWidth = 800;
        const svgHeight = 600;
        const margin = 10;

        var pie = d3.pie().sort(null).value(d => d.count);

        var radius = Math.min(svgWidth, svgHeight) / 2 - margin;

        const pieSvg = d3.select(this.refs.pieChart)
            .append("svg").attr("width", svgWidth).attr("height", svgHeight)
            .append("g").attr("transform", "translate(" + svgWidth * 0.4 + "," + svgHeight / 2 + ")");

        // set the color scale
        var color = d3.scaleOrdinal()
            .domain(classifiedData.map(d => d.name))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.6 + 0.1), classifiedData.length + 1).reverse());
            //.range(d3.quantize(d3.interpolate("red", "blue"), classifiedData.length + 1));

        // set path for pie char
        var arc = d3.arc()
            .innerRadius(100)         // This is the size of the donut hole
            .outerRadius(radius);
        
        // set path for label
        var arcLabel = d3.arc()
            .innerRadius(radius * 0.82) 
            .outerRadius(radius * 0.82);

        var data_ready = pie(classifiedData)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        pieSvg.selectAll('allPies')
            .data(data_ready).enter()
            .append('path')
                .attr('d', arc)
                .attr('fill', function(d){ return(color(d.data.name))}) 
                .attr("stroke", "white")                 
        
        pieSvg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 15)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(data_ready)
            .join("text")
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .call(text => text.append("tspan")
                    .attr("y", "-0.4em")
                    .attr("font-weight", "bold")
                    .text(d => d.data.name))
                .call(text => text.append("tspan")
                    .attr("x", 0)
                    .attr("y", "0.8em")
                    .attr("font-size", 14)
                    .text(d => '$ ' + d.data.count))
                .call(text => text.append("tspan")
                    .attr("x", 0)
                    .attr("y", "1.9em")
                    .attr("font-size", 14)
                    .text(d => d.data.percentage + '%'));

        pieSvg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold")
            .attr("font-size", 24)
            .attr("dy", "0em")
            .text("Total Expense");
        pieSvg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.4em")
            .attr("font-size", 20)
            .text("$ " + this.total.toFixed(2))
        
    }
    getMonth(num) {
        const monthMap = {"0":'ALL', "1":"January", "2":"February", "3":"March", "4":"April", "5":"May", "6":"June",
            "7":"July", "8":"August", "9":"September", "10":"October", "11":"November", "12":"December"};
        return monthMap[num];
    }
    render() {
        return(
        <div className="pie_chart">
            <h1>Expenses Summary</h1>
            <div className="show_year_month">
                YEAR: &nbsp; {parseInt(this.year) === 0 ? 'All' : this.year} &nbsp;&nbsp;
                MONTH: &nbsp; {this.getMonth(this.month)}
            </div>
            <div ref="pieChart"></div>
        </div>
        )
    }
}
export default Charts;