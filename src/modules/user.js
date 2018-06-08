export const ADD_DATA = 'user/ADD_DATA'

const initialState = {
  user: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        user: state.user
      }

    default:
      return state
  }
}

export const addData = () => {
  return dispatch => {
    dispatch({
      type: ADD_DATA
    })
  }
}
