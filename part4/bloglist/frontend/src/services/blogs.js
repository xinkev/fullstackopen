import axios from "axios"
const baseUrl = "/api/blogs"

const setToken = (newToken) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog)
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(baseUrl + `/${blog.id}`, blog)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update }
