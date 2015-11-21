import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import editorRed from './Components/editorReducers'
import {createStore} from 'redux';
import {Provider} from 'react-redux';

let store = createStore(editorRed);

ReactDOM.render(<Provider store = {store} ><App /></Provider>, document.getElementById('root'));
