import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './reducers'

import PouchDB from 'pouchdb';
import { persistentStore } from 'redux-pouchdb-plus';

const db = new PouchDB('dbname');

// //optional
const applyMiddlewares = applyMiddleware(
  // thunkMiddleware,
  // loggerMiddleware
);

const createStoreWithMiddleware = compose(
  applyMiddlewares,
  persistentStore({db})
)(createStore);

const store = createStoreWithMiddleware(todoApp);


// const store = createStore(todoApp);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
