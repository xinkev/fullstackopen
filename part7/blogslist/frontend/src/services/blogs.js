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

const remove = async (blog) => {
  await axios.delete(baseUrl + `/${blog.id}`)
}

const comment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comment`, { comment })
  return response.data
}

const blogService = { getAll, setToken, create, update, remove, comment }
export default blogService
