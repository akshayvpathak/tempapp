import {combineReducers} from 'redux'
import { LoginUser } from "./LoginUser";
import {Answers} from './Answers';
import {CurrentPage} from './CurrentPage'

const reducer = combineReducers({
    LoginUser: LoginUser,
    Answers: Answers,
    CurrentPage: CurrentPage
});
  
export default reducer;