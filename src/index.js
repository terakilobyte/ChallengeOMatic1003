import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import editorRed from './Components/editorReducers'
import {createStore} from 'redux';

let store = createStore({editorRed});

ReactDOM.render(<App />, document.getElementById('root'));
