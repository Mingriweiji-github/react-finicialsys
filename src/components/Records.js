import React, { Component } from 'react';
import Record from './Record'

class Records extends Component {
  constructor() {
    super();
    this.state = {
      records:[
          {"id":1,"date":"2018-9-20","title":"收入","amount":"10000"},
          {"id":2,"date":"2018-9-21","title":"收入","amount":"10000"},
          {"id":3,"date":"2018-9-22","title":"收入","amount":"10000"},
      ]
    }
  }

  render() {
    return (
      <div className="Records ">
        <h2>Records</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record) => <Record key={record.id} record={record} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Records;
