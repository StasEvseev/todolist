import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import '../components/InputNewTodo.css';

const ENTER_KEY = 'Enter';

const InputNewTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
        <input
            id="new-todo"
            placeholder="What needs to be done?"
            ref={node => input = node}
            onKeyPress={(event) => {
                if (event.key === ENTER_KEY) {
                    let value = event.target.value;
                    console.log('enter press here! ', value);

                    dispatch(addTodo(value));
                    input.value = '';
                }
            }} />
    </div>
  )
};

export default connect()(InputNewTodo)