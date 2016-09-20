import { take, put, fork, select, call } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

import { submitMode, changeMode, match, nextMode, submitRegulation } from './actions'

import { getMode } from 'util/index'

function* changeModeSaga() {
  while (true) {
    const { payload } = yield take(`${submitMode}`)
    sendData('change_mode', payload)
    if (payload == 'description') {
      yield put(match())
    }
    yield put(changeMode(payload))
  }
}

function* nextModeSaga() {
  const modes = ["description", "auction", "result", "wait"]
  while (true) {
    yield take(`${nextMode}`)
    const mode = yield select(({ mode }) => mode)
    let next = modes[0]
    for (let i = 0; i < modes.length; i ++) {
      if (mode == modes[i]) {
        next = modes[(i + 1) % modes.length]
        break
      }
    }
    yield put(submitMode(next))
  }
}

function* matchSaga() {
  sendData('match')
}

function* submitRegulationSaga(action) {
  sendData('change_regulation', action.payload)
}

function* saga() {
  yield fork(changeModeSaga)
  yield fork(nextModeSaga)
  yield fork(takeLatest, `${match}`, matchSaga)
  yield fork(takeLatest, `${submitRegulation}`, submitRegulationSaga)
}

export default saga
