import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  console.log(token, 'test')
  return request.then(response => response.data)
}

export default { getAll }