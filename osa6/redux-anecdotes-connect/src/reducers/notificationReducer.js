const initialState = { content: 'Default notification', visible: false, timeoutId: 0 }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW':
      return { content: `you added '${action.data.content}'`, visible: true }
    case 'SET':
      if (state.visible) {
        clearTimeout(state.timeoutId)
      }
      return action.data
    case 'RESET':
      return initialState
    default: return state
  }
}

export const setNotification = (content, timeout) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'RESET'
      })
    }, timeout)
    dispatch({
      type: 'SET',
      data: {
        content: content,
        visible: true,
        timeoutId: timeoutId
      }
    })
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer