import React, { Component } from 'react';
import RepLogs from   './RepLogs';
import PropTypes from 'prop-types';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        };

        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleNewItemSubmit(itemName, reps) {
        console.log('TODO - handle this data');
        console.log(itemName, reps);
    }

    render() {
        const { highlightedRowId, repLogs } = this.state;
        const { withHeart } = this.props;

        return (
            <RepLogs
                highlightedRowId={highlightedRowId}
                onNewItemSubmit={this.handleNewItemSubmit}
                onRowClick={this.handleRowClick}
                repLogs={repLogs}
                withHeart={withHeart}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}