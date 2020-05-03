import React, { Component } from 'react';
import axios from 'axios';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

class AddRecords extends Component {
    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            date: '',
            amount: '',
            category: 'Food',
            notes: ''
        }
    }

    componentDidMount() {
        const utcDate = new Date();
        const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
        this.setState({
            date: localDate
        });
    }

    onChangeDate(newdate) {
        console.log('newdate' + newdate)
        this.setState({
            date: newdate
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeNotes(e) {
        this.setState({
            notes: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const record = {
            date: this.state.date,
            amount: this.state.amount,
            category: this.state.category,
            notes: this.state.notes
        }
        axios.post('/record/add', record)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        window.location = '/';
    }

    render() {
        return(
            <div className="record">
            <h2>Add Expense</h2>
            <div className="form_ff">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker fullWidth
                    disableToolbar
                    variant="filled"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={this.state.date}
                    onChange={this.onChangeDate}
                    KeyboardButtonProps={{
                'aria-label': 'change date',
                }}/>
            </MuiPickersUtilsProvider>
            </div>
            <div className="form_ff">
            <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
                id="filled-adornment-amount"
                value={this.state.amount}
                onChange={this.onChangeAmount}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                type="number"
                required
                />
            <FormHelperText>*Required</FormHelperText>
            </FormControl>
            </div>

            <div className="form_ff">
            <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Cateogry</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.category}
                onChange={this.onChangeCategory}>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Transportation">Transportation</MenuItem>
                    <MenuItem value="Household">Household</MenuItem>
                    <MenuItem value="Apparel">Apparel</MenuItem>
                    <MenuItem value="Beauty">Beauty</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Travel">Travel</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormHelperText>*Required</FormHelperText>
            </FormControl>
            </div>

            <div className="form_ff">
            <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="filled-adornment-amount">Note</InputLabel>
            <OutlinedInput
                id="filled-adornment-amount"
                value={this.state.notes}
                onChange={this.onChangeNotes}
                required
                multiline
                rows={4}
                variant="outlined"
                />
            <FormHelperText>(Optional)</FormHelperText>
            </FormControl>
            </div>

            <div className="form_b">
            <Button variant="outlined" size="medium" style={{ color: 'green' }} onClick={this.onSubmit} color="inherit"><b>ADD</b> &nbsp;<AddCircleRoundedIcon/></Button>
            </div>
            </div>
        )
    }
}

export default AddRecords;