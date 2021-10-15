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

export const setNotification = (content) => {
  return {
    type: 'SET',
    data: {
      content: content,
      visible: true
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer