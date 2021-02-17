import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantityInputError: '',
            quantityValue: 0,
            selectedItemId: ''
        };

        this.itemSelect = React.createRef();
        this.quantityInput = React.createRef();

        this.itemOptions = [
            { id: 'cat', text: 'Cat' },
            { id: 'fat_cat', text: 'Big Fat Cat' },
            { id: 'laptop', text: 'My Laptop' },
            { id: 'coffee_cup', text: 'Coffee Cup' }
        ];
        this.handleQuantityInputChange = this.handleQuantityInputChange.bind(this);
        this.handleSelectedItemChangeEvent = this.handleSelectedItemChangeEvent.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const { onAddRepLog } = this.props;
        // const { selectedItemId, quantityValue } = this.state;
        const { quantityValue } = this.state;
        const itemLabel = this.itemOptions.find((option) => {
            return option.id === this.state.selectedItemId
        }).text;

        if (quantityValue <= 0) {
            this.setState({
                quantityInputError: 'Please enter a value greater than 0'
            })

            // don't submit, or clear the form
            return;
        }

        onAddRepLog(
            itemLabel,
            quantityValue
        );

        this.setState({
            quantityInputError: '',
            quantityValue: 0,
            selectedItemId: ''
        });
    }

    handleQuantityInputChange(event) {
        this.setState({
            quantityValue: event.target.value
        });
    }

    handleSelectedItemChangeEvent(event) {
        this.setState({
            selectedItemId: event.target.value
        });
    }

    render() {
        const { quantityInputError, quantityValue, selectedItemId } = this.state;
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label
                        className="sr-only control-label required"
                        htmlFor="rep_log_item"
                    >
                        What did you lift?
                    </label>
                    <select
                        className="form-control"
                        id="rep_log_item"
                        onChange={this.handleSelectedItemChangeEvent}
                        ref={this.itemSelect}
                        required="required"
                        value={selectedItemId}
                    >
                        <option value="">
                            What did you lift?
                        </option>
                        {this.itemOptions.map(option => {
                            return <option value={option.id} key={option.id}>{option.text}</option>
                        })}
                    </select>
                </div>
                {' '}
                <div className={`form-group ${quantityInputError ? 'has-error' : ''}`}>
                    <label
                        className="sr-only control-label required"
                        htmlFor="rep_log_reps"
                    >
                        How many times?
                    </label>
                    <input
                        className="form-control"
                        id="rep_log_reps"
                        onChange={this.handleQuantityInputChange}
                        placeholder="How many times?"
                        ref={this.quantityInput}
                        required="required"
                        type="number"
                        value={quantityValue}
                    />
                    {quantityInputError && <span className="help-block">{quantityInputError}</span>}
                </div>
                {' '}
                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        );
    }
}

RepLogCreator.propTypes = {
    onAddRepLog: PropTypes.func.isRequired,
};