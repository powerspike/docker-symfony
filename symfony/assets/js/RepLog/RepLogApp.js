import React, { Component } from 'react';
import RepLogs from   './RepLogs';
import PropTypes from 'prop-types';
// import { v4 as uuid } from 'uuid';
import { createRepLog, deleteRepLog, getRepLogs } from '../api/rep_log_api';
export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            isLoaded: false,
            isSavingNewRepLog: false,
            numberOfHearts: 1,
            repLogs: [],
            successMessage: ''
        };

        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.successMessageTimeoutHandle = 0;
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                })
            });
    }

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            item: item,
            reps: reps
        };

        this.setState({
            isSavingNewRepLog: true
        });

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {
                        isSavingNewRepLog: false,
                        repLogs: newRepLogs,
                    };
                })

                this.setSuccessMessage('Rep Log Saved!');
            })
        ;
    }

    handleDeleteRepLog(id) {
        deleteRepLog(id);
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

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });

        clearTimeout(this.successMessageTimeoutHandle);
        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            });
            this.successMessageTimeoutHandle = 0;
        }, 3000)
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}