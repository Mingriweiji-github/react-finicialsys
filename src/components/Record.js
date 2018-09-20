import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Record extends Component {
    render() {
        return (
            <tr key={this.props.id}>
                <th>{this.props.date}</th>
                <th>{this.props.title}</th>
                <th>{this.props.amount}</th>
            </tr>
        );
    }
}
Record.propTypes = {
    id:PropTypes.string,
    date:PropTypes.string,
    title:PropTypes.string,
    amount:PropTypes.string
}