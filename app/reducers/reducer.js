
const SAVE_USER = 'SAVE_USER'

export function saveUser(results) {
  return {
    type: SAVE_USER,
    results
  }
}


const initialState = {
  user: {}
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_USER:
      console.log('action.results', action.results)
      return {
        ...state,
        user: action.results
      }
    default:
      return state
  }
}
