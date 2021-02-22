import React from 'react';
import RepLogList from './RepLogList';
import PropTypes from 'prop-types';
import RepLogCreator from './RepLogCreator';
// import RepLogCreator from './RepLogCreatorControlledComponent';

function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }

    return total;
}
const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);
export default function RepLogs(props) {
    const {
        highlightedRowId,
        isLoaded,
        isSavingNewRepLog,
        itemOptions,
        newRepLogValidationErrorMessage,
        numberOfHearts,
        onAddRepLog,
        onDeleteRepLog,
        onHeartChange,
        onRowClick,
        repLogs,
        successMessage,
        withHeart
    } = props;

    let heart = '';
    if (withHeart) {
        heart = <span>{'❤️'.repeat(numberOfHearts)}</span>;
    }

    return (
        <div className="col-md-7">
            <h2>Lift Stuff! {heart}</h2>

            <input
                onChange={(e) => {
                    onHeartChange(+e.target.value); // plus casts string to number
                }}
                type="range"
                value={numberOfHearts}
            />

            <hr/>

            {successMessage && (
                <div className="alert-success text-center">
                    {successMessage}
                </div>
            )}

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    isLoaded={isLoaded}
                    isSavingNewRepLog={isSavingNewRepLog}
                    onDeleteRepLog={onDeleteRepLog}
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                />
                <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <th>Total</th>
                        <th>{calculateTotalWeightFancier(repLogs)}</th>
                        <td>&nbsp;</td>
                    </tr>
                </tfoot>
            </table>

            <div className="row">
                <div className="col-md-6">
                    <RepLogCreator
                        itemOptions={itemOptions}
                        onAddRepLog={onAddRepLog}
                        validationErrorMessage={newRepLogValidationErrorMessage}
                    />
                </div>
            </div>
        </div>

    );
}
RepLogs.propTypes = {
    highlightedRowId: PropTypes.any,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
    itemOptions: PropTypes.array.isRequired,
    newRepLogValidationErrorMessage: PropTypes.string.isRequired,
    numberOfHearts: PropTypes.number.isRequired,
    onAddRepLog: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    successMessage: PropTypes.string.isRequired,
    withHeart: PropTypes.bool
}