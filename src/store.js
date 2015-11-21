import editorRed from './Components/editorReducers'
import {createStore} from 'redux';

const store = createStore(editorRed);

export default store;