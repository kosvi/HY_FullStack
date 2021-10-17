const initialState = { content: 'Default notification', visible: false }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW':
      return { content: `you added '${action.data.content}'`, visible: true }
    case 'SET':
      return action.data
    case 'RESET':
      return initialState
    default: return state
  }
}

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: {
        content: content,
        visible: true
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, timeout)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer