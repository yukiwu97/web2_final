import React, { Component } from 'react';
import axios from 'axios';

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
            originNotes: props.location.updateProps.notes
        }
    }

    componentDidMount() {
        this.setState({
            date: this.state.originDate.toISOString().split('T')[0],
            amount: this.state.originAmount,
            category: this.state.originCategory,
            notes: this.state.originNotes
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
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
        axios.post('/record/update/' + this.state.id, record)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        window.location = '/';
    }

    render() {
        return(
            <div className="record">
            <h2>Update Expense</h2>
            <form id="update_record_form" onSubmit={this.onSubmit}>
                <div className="form-field">
                    <label>Date </label>
                    <input type="date" name="date" placeholder="" value={this.state.date} onChange={this.onChangeDate} required />
                </div>
                <div className="form-field">
                    <label>Amount </label>
                    <input type="number" name="amount" placeholder="" value={this.state.amount} onChange={this.onChangeAmount} required/>
                </div>
                <div className="form-field">
                    <label>Category </label>
                    <select id="categories" name="category" value={this.state.category} onChange={this.onChangeCategory}>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Household">Household</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Gift">Gift</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Notes </label>
                    <input type="text" name="notes" placeholder="" value={this.state.notes} onChange={this.onChangeNotes} />
                </div>
                <input className="submit" type="submit" value="Submit"></input>
            </form>
            </div>
        )
    }
}

export default UpdateRecords;