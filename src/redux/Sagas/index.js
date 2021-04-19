import {LoginUser} from './LoginUser';
import {AddAnswer} from './Answers';
import {CurrentPage} from './CurrentPage';
import { fork } from 'redux-saga/effects';
export function* rootSaga() {
  yield fork(LoginUser);
  yield fork(AddAnswer);
  yield fork(CurrentPage);
}
