import { combineReducers } from "redux";
import { authReducer as auth } from "./authReducer"
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
   auth,
   form: formReducer,
   routing: routerReducer
});