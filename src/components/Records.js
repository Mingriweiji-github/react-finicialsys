import React, {Component} from 'react';
import Record from './Record'
import * as RecordsAPI from "../utils/RecordsAPI"
import RecordForm from "./RecordForm"

class Records extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }

    componentDidMount() {
        RecordsAPI.getAll().then(
            response => this.setState({
                records: response.data,
                isLoaded: true
            })
        ).catch(
            error => this.setState({
                isLoaded: true,
                error
            })
        )
    }

    addRecord(record) {
        console.log(record);
        // this.setState({
        //     // isLoaded: true,
        //     records: [
        //         ...this.state.records,
        //         record
        //     ]
        // },()=>{console.log(this.state.records)});
        this.setState({
            error:null,
            isLoaded:true,
            records:[
                ...this.state.records,
                record
            ]
        },() => {console.log(this.state.records)});
    }
    editRecord(record,data) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map((item,index) => {
            if (index != recordIndex){
                return item;
            }
            return{
                ...item,
                ...data
            }
        });
        this.setState({
            records:newRecords
        })
    }
    render() {
        const {error, isLoaded, records} = this.state;
        let recordComponent;
        if (error) {
            recordComponent = <div>Error:{error.message}</div>
        } else if (!isLoaded) {
            recordComponent = <div>Loading ...</div>
        } else {
            recordComponent = (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((record) => <Record key={record.id} record={record} handleEditRecord={this.editRecord.bind(this)} />)}
                    </tbody>
                </table>
            );
        }
        return (
            <div>
                <h2>Records</h2>
                <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
                {recordComponent}
            </div>
        );
    }
}

export default Records;

