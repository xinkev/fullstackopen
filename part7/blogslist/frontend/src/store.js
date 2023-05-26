import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer, { clearUser, setUser } from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"

const KEY = "loggedin_user"
const loadUser = () => {
  return JSON.parse(localStorage.getItem(KEY))
}

const authMiddleware = createListenerMiddleware()
authMiddleware.startListening({
  matcher: isAnyOf(setUser, clearUser),
  effect: (action, listenerApi) => {
    if (setUser.match(action)) {
      const user = listenerApi.getState().user
      localStorage.setItem(KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(KEY)
    }
  },
})

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
  preloadedState: { user: loadUser() },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware(),
    authMiddleware.middleware,
  ],
})
