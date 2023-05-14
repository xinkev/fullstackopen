import axios from "axios"
const baseUrl = "/api/blogs"

const setToken = (newToken) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken }
