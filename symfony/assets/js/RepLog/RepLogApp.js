import React, { Component } from 'react';
import RepLogs from   './RepLogs';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { getRepLogs } from '../api/rep_log_api';
export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        getRepLogs()
            .then((data) => {
                console.log(data);
            });

        this.state = {
            highlightedRowId: null,
            numberOfHearts: 1,
            repLogs: []
        };

        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data
                })
            });
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

    handleDeleteRepLog(id) {
        // remove the rep log without mutating state
        // filter returns a new array
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
            };
        });
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    render() {
        // const { highlightedRowId, repLogs } = this.state;
        // const { withHeart } = this.props;

        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onAddRepLog={this.handleAddRepLog}
                onDeleteRepLog={this.handleDeleteRepLog}
                onHeartChange={this.handleHeartChange}
                onRowClick={this.handleRowClick}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}