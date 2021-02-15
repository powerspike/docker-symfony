import React from 'react';
import RepLogList from './RepLogList';
import PropTypes from 'prop-types';

function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }

    return total;
}
const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);
export default function RepLogs(props) {
    const { highlightedRowId, onNewItemSubmit, onRowClick, repLogs, withHeart } = props;

    let heart = '';
    if (withHeart) {
        heart = <span>❤️</span>;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('form submitted');
        console.log(event.target.elements.namedItem('reps').value);
        onNewItemSubmit('Big Fat Cat', event.target.elements.namedItem('reps').value);
    }

    return (
        <div className="col-md-7">
            <h2>Lift Stuff! {heart}</h2>

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
            <form className="form-inline js-new-rep-log-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select
                        className="form-control"
                        id="rep_log_item"
                        name="item"
                        required="required"
                    >
                        <option value="">
                            What did you lift?
                        </option>
                        <option value="cat">Cat</option>
                        <option value="fat_cat">Big Fat Cat</option>
                        <option value="laptop">My Laptop</option>
                        <option value="coffee_cup">Coffee Cup</option>
                    </select>
                </div>
                {' '}
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input
                        className="form-control"
                        id="rep_log_reps"
                        name="reps"
                        placeholder="How many times?"
                        required="required"
                        type="number"
                    />
                </div>
                {' '}
                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        </div>

    );
}
RepLogs.propTypes = {
    highlightedRowId: PropTypes.any,
    onNewItemSubmit: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    withHeart: PropTypes.bool
}