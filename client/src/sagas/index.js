import { fork } from "redux-saga/effects";
import { watchAuth, watchDeAuth, autoAuth } from "./authWatcher";
import { watchFileUpload, watchLoadFiles, watchRemoveFiles } from "./fileWatcher";

export default function* rootSaga() {
    yield [
        watchAuth(),
        watchDeAuth(),
        autoAuth(),
        watchFileUpload(),
        watchLoadFiles(),
        watchRemoveFiles()
    ]
}