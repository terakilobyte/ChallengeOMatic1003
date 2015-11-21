import editorRed from './Components/editorReducers'
import {createStore} from 'redux';

let store = createStore(editorRed);

export default store;