import React from 'react';
import PropTypes from 'prop-types';

export default function RepLogList(props) {
    const {
        highlightedRowId,
        onDeleteRepLog,
        onRowClick,
        repLogs
     } = props;

    const handleDeleteClick = function(event, repLogId) {
        event.preventDefault();

        onDeleteRepLog(repLogId);
    };

    return (
        <tbody>
        {repLogs.map((repLog) => {
            return (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'info' : ''}
                    onClick={() => onRowClick(repLog.id)}
                >
                    <td>{repLog.itemLabel}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>
                        <a href="#" onClick={(event) => handleDeleteClick(event, repLog.id) }>
                            <span className="fa fa-trash"></span>
                        </a>
                    </td>
                </tr>
            )
        })}
        </tbody>
    )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onDeleteRepLog: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
};