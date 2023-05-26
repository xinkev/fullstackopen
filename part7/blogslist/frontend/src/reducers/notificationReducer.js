import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setMessage(_state, action) {
      return action.payload
    },
    clearMessage() {
      return null
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (notification, timeout = 5_000) => {
  return async (dispatch) => {
    dispatch(setMessage(notification))
    setTimeout(() => {
      dispatch(clearMessage())
    }, timeout)
  }
}

export default notificationSlice.reducer
