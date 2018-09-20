import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date:"",
            title:"",
            amount:""
        }
    }
    valid() {
        return this.state.date && this.state.title && this.state.amount
    }
    handleChange(event) {
        // let name, obj;
        // name = event.target.name;
        // this.setState((
        //     obj = {},
        //     obj["" + name] = event.target.value,
        //     obj
        // ));
        const {name, value} = event.target;
        this.setState ({
            [name]:value
        });
        console.log([name],value);

    }
    render() {
        return (
            <form className="form-inline">
                <div className="from-group">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Date" name="date" value={this.state.date}/>
                </div>
                <div className="from-group">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Title" name="title" value={this.state.title}/>
                </div>
                <div className="from-group">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Amount" name="amount" value={this.state.amount}/>
                </div>
                <button className="btn btn-primary" disabled={!this.valid()}>Add Record</button>
            </form>
        );
    }
}
