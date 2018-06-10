import React, { Component } from 'react';

import './App.css';

import InputNewTodo from './containers/InputNewTodo';
import TodoList from './containers/TodoList'


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="TodoApp">
                <header className="TodoApp-header">
                    <h1>todos</h1>
                    <InputNewTodo />
                </header>
            <section className="TodoApp-main">
                <TodoList />
            </section>
            <footer className="TodoApp-footer">
                <span id="todo-count"></span>
                <div id="sync-wrapper">
                    <div id="sync-success">Currently syncing</div>
                    <div id="sync-error">There was a problem syncing</div>
                </div>
            </footer>
        </section>
    );
  }
}

export default App;
