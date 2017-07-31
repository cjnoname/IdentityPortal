import { combineReducers } from "redux";
import { authReducer as auth } from "./authReducer";
import { fileReducer as file } from "./fileReducer";
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
   auth,
   file,
   form: formReducer,
   routing: routerReducer
});