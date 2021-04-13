import {combineReducers} from 'redux'
import { LoginUser } from "./LoginUser";
import {Answers} from './Answers';

const reducer = combineReducers({
    LoginUser: LoginUser,
    Answers: Answers
});
  
export default reducer;