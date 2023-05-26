import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store"

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.createRoot(document.getElementById("root")).render(<Root />)
