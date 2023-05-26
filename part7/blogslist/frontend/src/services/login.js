import axios from "axios"
const baseUrl = "/api/login"

const login = async (credientials) => {
  const response = await axios.post(baseUrl, credientials)
  return response.data
}

const loginService = { login }
export default loginService
