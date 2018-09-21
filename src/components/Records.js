import React, {Component} from 'react';
import Record from './Record'
import * as RecordsAPI from "../utils/RecordsAPI"
import RecordForm from "./RecordForm"
import AmountBox from './AmountBox'

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
            if (index !== recordIndex){
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
    deleteRecord(record) {
        console.log(record);
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item,index) => index != recordIndex);
        this.setState({
            records:newRecords
        });
    }
    amounts() {
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0
        })
        return credits.reduce((prev,curr) => {
            return prev + Number.parseInt(curr.amount,0)
        },0)
    }
    debits() {
        let credits = this.state.records.filter((record) => {
            return record.amount < 0
        })
        return credits.reduce((prev,curr) => {
            return prev + Number.parseInt(curr.amount,0)
        },0)
    }
    balances() {
        return this.amounts() + this.amounts();
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
                    {records.map((record) =>
                        (<Record
                            key={record.id}
                            record={record}
                            handleEditRecord={this.editRecord.bind(this)}
                            handleDeleteRecord={this.deleteRecord.bind(this)}
                        />)
                    )}
                    </tbody>
                </table>
            );
        }
        return (
            <div>
                <h2>Records</h2>
                <div className="row rb-3">
                    <AmountBox text="Credit" type="success" amount={this.amounts()}/>
                    <AmountBox text="Debit" type="danger" amount={this.debits()}/>
                    <AmountBox text="Balance" type="info" amount={this.balances()}/>
                </div>
                <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
                {recordComponent}
            </div>
        );
    }
}

export default Records;

