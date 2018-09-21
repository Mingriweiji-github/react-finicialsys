import React, { Component } from 'react';
import * as RecordsAPI from "../utils/RecordsAPI"

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
    handleSubmit(e) {
        e.preventDefault();
        const data = {
            date: this.state.date,
            title:this.state.title,
            amount: this.state.amount
        };
        RecordsAPI.create(data).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                })
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="from-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Date" name="date" value={this.state.date}/>
                </div>
                <div className="from-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Title" name="title" value={this.state.title}/>
                </div>
                <div className="from-group mr-1">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Amount" name="amount" value={this.state.amount}/>
                </div>
                <button className="btn btn-primary" disabled={!this.valid()}>Add Record</button>
            </form>
        );
    }
}
