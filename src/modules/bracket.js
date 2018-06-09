export const ADD_DATA = 'user/ADD_DATA'

const initialState = {
  user: {},
  matches: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        user: action.payload.user,
        matches: action.payload.matches
      }

    default:
      return state
  }
}

export const addData = (data) => {
  return dispatch => {
    dispatch({
      type: ADD_DATA,
      payload: data
    })
  }
}
