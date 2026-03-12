import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`)
  return response.data
}

export const fetchPosts = async () => {
  const response = await axios.get(`${BASE_URL}/posts`)
  return response.data
}

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`)
  return response.data
}
