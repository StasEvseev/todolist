import React, { Component } from 'react';
import './InputNewTodo.css';

const ENTER_KEY = 'Enter';


class InputNewTodo extends Component {

    constructor(props) {
        super(props);

        this.handleEnter = this.handleEnter.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            items: [],
            value : ''
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
            // items: [...prevState.items, event.target.value]
        });
    }

    handleEnter = (event) => {
        if (event.key === ENTER_KEY) {
            let value = event.target.value;
            console.log('enter press here! ', value, this.state);

            this.setState((prevState) => ({
                value: '',
                items: [...prevState.items, value]
            }));
        }
    };

    render() {
        return (
            <input id="new-todo" placeholder="What needs to be done?"
                   onKeyPress={this.handleEnter}
                   onChange={this.handleChange}
                   autoFocus value={this.state.value} />
        );
    }
}

export default InputNewTodo;
