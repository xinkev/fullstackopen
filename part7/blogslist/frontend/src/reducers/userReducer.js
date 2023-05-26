import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    localStorage.setItem("loggedin_user", JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("loggedin_user")
    dispatch(clearUser())
  }
}
export default userSlice.reducer
