import { fork } from "redux-saga/effects";
import authWatcher from "./watcher";

export default function* rootSaga() {
    yield [
        authWatcher()
    ]
}