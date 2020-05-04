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
import SaveIcon from '@material-ui/icons/Save';

class UpdateRecords extends Component {
    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.location.updateProps._id,
            date: '',
            amount: '',
            category: '',
            notes: '',
            originDate: new Date(props.location.updateProps.date),
            originAmount: props.location.updateProps.amount,
            originCategory: props.location.updateProps.category,
            originNotes: props.location.updateProps.notes,
            error_input: false
        }
    }

    componentDidMount() {
        this.setState({
            date: this.state.originDate,
            amount: this.state.originAmount,
            category: this.state.originCategory,
            notes: this.state.originNotes
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e
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
        if (this.state.amount > 0) {
            axios.post('/record/update/' + this.state.id, record)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            window.location = '/';
        } else {
            this.setState({
                error_input: true
            });
        }
    }

    render() {
        return(
            <div className="record">
            <h2>Update Expense</h2>
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
                error={this.state.error_input}
                />
            <FormHelperText>*Required</FormHelperText>
            <FormHelperText hidden={!this.state.error_input} error >amount should be greater than 0</FormHelperText>
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
            <Button variant="outlined" size="medium" style={{ color: 'green' }} onClick={this.onSubmit} color="inherit"><b>UPDATE</b> &nbsp;<SaveIcon/></Button>
            </div>
            </div>
        )
    }
}

export default UpdateRecords;