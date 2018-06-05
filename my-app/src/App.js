import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputNewTodo from './components/InputNewTodo';

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

class App extends Component {
  render() {
    return (
      <section className="TodoApp">
          <header className="TodoApp-header">
              <h1>todos</h1>
              <InputNewTodo />
          </header>
          <section className="TodoApp-main">
              <ul id="todo-list">{listItems}</ul>
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
