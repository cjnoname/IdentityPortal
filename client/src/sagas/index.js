import { fork } from "redux-saga/effects";
import { watchAuth, watchDeAuth, autoAuth } from "./authWatcher";
import { watchFileUpload } from "./fileWatcher";

export default function* rootSaga() {
    yield [
        watchAuth(),
        watchDeAuth(),
        autoAuth(),
        watchFileUpload()
    ]
}