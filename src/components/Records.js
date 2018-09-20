import React, { Component } from 'react';
import Record from './Record'
import axios from 'axios';
import * as RecordsAPI from "../utils/RecordsAPI"
import RecordForm from "./RecordForm"
class Records extends Component {
  constructor() {
    super();
    this.state = {
        error:null,
        isLoaded:false,
        records:[]
    }
  }
  componentDidMount(){
      console.log("React did mounted");
      axios.get(`${RecordsAPI.api}`).then(
          response => this.setState({
              records:response.data,
              isLoaded:true
          })
      ).catch(
          error => this.setState({
              isLoaded:true,
              error
          })
      )
  }
  render() {
      const {error, isLoaded,records} = this.state;
      let recordComponent;
      if (error){
          recordComponent = <div>Error:{error.message}</div>
      }else if (!isLoaded){
          recordComponent = <div>Loading ...</div>
      }else{
          recordComponent = (
                  <table className="table table-bordered">
                      <thead>
                      <tr>
                          <th>Date</th>
                          <th>Title</th>
                          <th>Amount</th>
                      </tr>
                      </thead>
                      <tbody>
                      {records.map((record) => <Record key={record.id} {...record} />)}
                      </tbody>
                  </table>
          );
      }
      return (
            <div>
                <h2>Records</h2>
                <RecordForm />
                {recordComponent}
            </div>
      );
  }
}

export default Records;

