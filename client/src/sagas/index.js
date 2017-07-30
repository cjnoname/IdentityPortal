import { fork } from "redux-saga/effects";
import { watchAuth, watchDeAuth, autoAuth } from "./authWatcher";

export default function* rootSaga() {
    yield [
        watchAuth(),
        watchDeAuth(),
        autoAuth()
    ]
}