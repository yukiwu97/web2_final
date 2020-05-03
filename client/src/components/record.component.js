import React, { Component } from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import Popup from "reactjs-popup";
import Charts from "./chart.component";
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';



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
        axios.get("/record")
            .then(res => {
                const recordsData = res.data;
                console.log(recordsData);
                this.setState({
                    recordsList : recordsData.sort((a,b) => (a.date > b.date) ? 1: -1),
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

        axios.get('/record/delete/' + record._id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        window.location = '/';
    }

    updateRecord(e, record) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/update',
            updateProps: record
        })
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

        axios.get("/record/yearMonth/" + this.state.selectedYear + "/" + this.state.selectedMonth)
            .then(res => {
                const recordsData = res.data;
                console.log(recordsData);
                this.setState({
                    recordsList : recordsData.sort((a,b) => (a.date > b.date) ? 1: -1),
                    sum: this.calculateSum(recordsData)
                });
            })
    }

    render() {

        return(
        <div className="record">
            <div className="records_header">
            <div className="yymm">
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">YEAR</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.selectedYear}
                onChange={this.handleSelectYear}
                label="Age">
                    <MenuItem value="0">All</MenuItem>
                    <MenuItem value="2020">2020</MenuItem>
                    <MenuItem value="2019">2019</MenuItem>
                    <MenuItem value="2018">2018</MenuItem>
                    <MenuItem value="2017">2017</MenuItem>
                    <MenuItem value="2016">2016</MenuItem>
                    <MenuItem value="2015">2015</MenuItem>
                    <MenuItem value="2014">2014</MenuItem>
                    <MenuItem value="2013">2013</MenuItem>
                    <MenuItem value="2012">2012</MenuItem>
                    <MenuItem value="2011">2011</MenuItem>
                    <MenuItem value="2010">2010</MenuItem>
                </Select>
            </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FormControl variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">MONTH</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.selectedMonth}
                onChange={this.handleSelectMonth}
                label="Age">
                    <MenuItem value="0">All</MenuItem>
                    <MenuItem value="1">JAN</MenuItem>
                    <MenuItem value="2">FEB</MenuItem>
                    <MenuItem value="3">MAR</MenuItem>
                    <MenuItem value="4">APR</MenuItem>
                    <MenuItem value="5">MAY</MenuItem>
                    <MenuItem value="6">JUN</MenuItem>
                    <MenuItem value="7">JUL</MenuItem>
                    <MenuItem value="8">AUG</MenuItem>
                    <MenuItem value="9">SEP</MenuItem>
                    <MenuItem value="10">OCT</MenuItem>
                    <MenuItem value="11">NOV</MenuItem>
                    <MenuItem value="12">DEC</MenuItem>
                </Select>
            </FormControl>
            <div className="searchButton">
            <Button variant="outlined" size="small" style={{ color: 'green' }} color="inherit" onClick={this.onSubmitSelect}>Search</Button>
            </div>
            </div>
            <div className='header_sum'>
            <div className="sum_label"><label>TOTAL: &nbsp;&nbsp;</label></div>
                <span className="sum_num"><b>{'$' + this.state.sum.toFixed(2)}</b></span>
                <Popup modal contentStyle={{width: "80%"}}
                trigger={
                    <div className="chartButton"><Button variant="outlined" size="small" style={{ color: 'green' }} color="inherit" >Show Chart &nbsp;<DonutLargeRoundedIcon/></Button></div>}>{ close => (
                    <div className="modal">
                    <div className="close" onClick={close}>&times;</div>
                    <Charts datalist={this.state.recordsList} month={this.state.selectedMonth} year={this.state.selectedYear}/>
                    </div>
                )}
                </Popup>
            </div>
            </div>

            <div className="records_table">
            <table>
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
                            <td className='desc-col' id='table_notes'>{record.notes}</td>
                            <td className='button-col'>
                                <IconButton size="small" style={{ color: '#b6b3b3' }} className="table_update_icon" onClick = {(e) => {this.updateRecord(e, record)}}>
                                    <BorderColorRoundedIcon/>
                                </IconButton>
                            </td>
                            <td className='button-col'>
                                <IconButton size="small" style={{ color: '#b6b3b3' }} className="table_delete_icon" onClick = {(e) => {this.deleteRecord(e, record)}}>
                                    <DeleteForeverRoundedIcon/>
                                </IconButton>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    )
    }
}

export default Record;