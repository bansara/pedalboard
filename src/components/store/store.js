import { createStore, combineReducers } from 'redux'
import { defaultSettings } from '../../utils/defaultSettings'

const initialState = {
  msg: 59
}

const midiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'noteOn':
      return { msg: action.msg, time: action.time }
    default:
      return state
  }
}

const presetReducer = (state = defaultSettings, action) => {
  switch (action.msg) {
    default:
      return state
  }
}

const reducer = combineReducers({
  midi: midiReducer,
  patch: presetReducer
})

const store = createStore(reducer)

export default store