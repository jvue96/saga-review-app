import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// set up for redux & rediux saga 
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import logger from 'redux-logger'; 


// character list reducer - will hold characters from server 
// action SET_CHARACTERS sent by saga with payload
const characterListReducer = (state = [], action) => {
    if(action.type === 'SET_CHARACTERS') {
        return action.payload; 
    }
        return state; 
} // end characterListReducer

const reduxStore = createStore(
    combineReducers({
        characterListReducer,
    }),
    applyMiddleware(logger)
)

ReactDOM.render(
<Provider store={reduxStore}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
