import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import counter from './counter'
import bracket from './bracket'

export default combineReducers({
  routing: routerReducer,
  counter,
  bracket,
  form: formReducer
})
