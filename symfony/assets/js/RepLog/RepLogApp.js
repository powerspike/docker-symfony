import React, { Component } from 'react';
import RepLogs from   './RepLogs';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            numberOfHearts: 1,
            repLogs: [
                { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: uuid(), reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        };

        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    handleAddRepLog(itemLabel, reps) {
        const newRep = {
            id: uuid(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };
        
        this.setState(prevState => {
            const newRepLogs = [...prevState.repLogs, newRep];

            return {repLogs: newRepLogs};
        })
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    render() {
        const { highlightedRowId, repLogs } = this.state;
        const { withHeart } = this.props;

        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onRowClick={this.handleRowClick}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}