import React, { Component } from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Charts from "./chart.component";

class Record extends Component {

    constructor(props) {
        super(props);
        this.handleSelectYear = this.handleSelectYear.bind(this);
        this.handleSelectMonth = this.handleSelectMonth.bind(this);
        
        this.onSubmitSelect = this.onSubmitSelect.bind(this);

        this.state = {
            recordsList: [],
            sum: 0,
            selectedYear: 0,
            selectedMonth: 0
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:3003/record")
        //axios.get("/record")
            .then(res => {
                const recordsData = res.data;
                console.log(recordsData);
                this.setState({
                    recordsList : recordsData.sort((a,b) => (a.year > b.year) ? 1: (a.year ===b.year) ? ((a.month > b.month) ? 1:-1):-1),
                    sum: this.calculateSum(recordsData)
                });
            })
            .catch(error => {
                console.log("loading records failed..")
                console.log(error)
            })
    }

    deleteRecord(e, record) {
        e.preventDefault();

        axios.get('http://localhost:3003/record/delete/' + record._id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        window.location = '/';
    }

    getLocalFormatDate(d) {
        const utcDate = new Date(d);
        const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
        return dateFormat(localDate, "ddd mmm dd, yyyy");
    }

    calculateSum(dataList) {
        var sum = 0;
        dataList.forEach(item => {
            sum = sum + parseFloat(item.amount);
        });
        return sum;
    }

    handleSelectYear(e) {
        this.setState({
            selectedYear: e.target.value
        });
    }

    handleSelectMonth(e) {
        this.setState({
            selectedMonth: e.target.value
        });
    }

    onSubmitSelect(e) {
        e.preventDefault();

        axios.get("http://localhost:3003/record/yearMonth/" + this.state.selectedYear + "/" + this.state.selectedMonth)
            .then(res => {
                const recordsData = res.data;
                console.log(recordsData);
                this.setState({
                    recordsList : recordsData.sort((a,b) => (a.year > b.year) ? 1: (a.year ===b.year) ? ((a.month > b.month) ? 1:-1):-1),
                    sum: this.calculateSum(recordsData)
                });
            })
    }

    render() {
        return(
        <div className="record">
            <h1>Money Manager</h1>
            <form onSubmit={this.onSubmitSelect}>
                <label>Select Year: </label>
                <select id="year" name="year" value={this.state.selectedYear} onChange={this.handleSelectYear}>
                    <option value="0" selected>Select All</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                </select>
                <label>Select Month: </label>
                <select id="month" name="month" onChange={this.handleSelectMonth}>
                    <option value="0" selected>Select All</option>
                    <option value="1">JAN</option>
                    <option value="2">FEB</option>
                    <option value="3">MAR</option>
                    <option value="4">APR</option>
                    <option value="5">MAY</option>
                    <option value="6">JUN</option>
                    <option value="7">JUL</option>
                    <option value="8">AUG</option>
                    <option value="9">SEP</option>
                    <option value="10">OCT</option>
                    <option value="11">NOV</option>
                    <option value="12">DEC</option>
                </select>
                <input className="submit" type="submit" value="Submit"></input>
            </form>
            <div className="expense_sum">
                <label>total expense: </label>
                <span>{'$' + this.state.sum.toFixed(2)}</span>
                <Popup modal contentStyle={{width: "80%"}}
                trigger={<button> Show Expense Chart</button>}>{ close => (
                    <div className="modal">
                    <div className="close" onClick={close}>&times;</div>
                    <Charts datalist={this.state.recordsList} month={this.state.selectedMonth} year={this.state.selectedYear}/>
                    </div>
                )}</Popup>
            </div>
            <table className="records_table">
                <thead>
                    <tr>
                        <th></th>
                        <th className='desc-h-col'>DATE</th>
                        <th className='desc-h-col'>AMOUNT</th>
                        <th className='desc-h-col'>CATEGORY</th>
                        <th className='desc-h-col'>NOTES</th>
                        <th className='button-col'></th>
                        <th className='button-col'></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.recordsList.map(record =>
                        <tr>
                            <td className='counterCell'></td>
                            <td className='desc-col' id='table_date'>{this.getLocalFormatDate(record.date)}</td>
                            <td className='desc-col' id='table_amount'>$ {record.amount.toFixed(2)}</td>
                            <td className='desc-col' id='table_category'>{record.category}</td>
                            <td className='desc-col'>{record.notes}</td>
                            <td className='button-col'>
                                <Link to={
                                    {
                                        pathname: '/update',
                                        updateProps: record
                                    }
                                }><button>update</button></Link>
                            </td>
                            <td className='button-col'><button onClick = {(e) => {this.deleteRecord(e, record)}}>delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
    }
}

export default Record;