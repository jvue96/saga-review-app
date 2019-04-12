import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// set up for redux
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import logger from 'redux-logger'; 
import axios from 'axios'; 

// set up for redux-saga
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

/* --------- SAGA -------------- */

// getCharactersSaga - will fetch the characters from the server
// and pass them off to characterListReducer to update Redux store 
function* getCharactersSaga ( action ) { /* passing in action if any data is needed from it. */
    try{
        // created response variable in order to pass into a reducer. 
        const response = yield axios.get('/character')  
        // yield means wait for asynch. to complete before moving on to the next code. 
        // yield has to be used inside of a generator function in order to work as it should. 
        yield put( { type: 'SET_CHARACTERS', payload: response.data } )
        console.log(`Sent off SET_CHARACTERS action, in this case -> characterListReducer `);
        
    }
    catch (error) {
        console.log(`Couldn't get data. Debug`);
        
    }
} // end getCharactersSaga


/* -------- REDUCERS ---------- */

// character list reducer - will hold characters from server 
// action SET_CHARACTERS sent by saga with payload
const characterListReducer = (state = [], action) => {
    if(action.type === 'SET_CHARACTERS') {
        return action.payload; 
    }
        return state; 
} // end characterListReducer

// set up redux and sagas
const sagaMiddleWare = createSagaMiddleware(); 

function* watcherSaga () {
    yield takeEvery ( 'GET_CHARACTER', getCharactersSaga )
}

const reduxStore = createStore(
    combineReducers({
        characterListReducer,
    }),
    applyMiddleware(sagaMiddleWare, logger)
)

// this line of code has to come after mounting sagaMiddleWare in applyMiddleware
sagaMiddleWare.run(watcherSaga); 

ReactDOM.render(
<Provider store={reduxStore}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
