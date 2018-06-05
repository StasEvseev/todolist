import React, { Component } from 'react';
// import InputNewTodo from "./InputNewTodo";


class TodoList extends Component {

    constructor(props) {
        super(props);

        this.handleEnter = this.handleEnter.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            items: [],
            value: ''
        }
    }

    render() {
        return(
            <ul id="todo-list">{listItems}</ul>
            // <input id="new-todo" placeholder="What needs to be done?"
            //        onKeyPress={this.handleEnter}
            //        onChange={this.handleChange}
            //        autoFocus value={this.state.value} />
        );
    }
}

export default TodoList;
