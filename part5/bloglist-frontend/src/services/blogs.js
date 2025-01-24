import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return request.then(response => response.data)
}

const addBlog = (token, title, author, url) => {
  const request = axios.post(baseUrl, {
    title: title,
    author: author,
    url: url
  },{
    headers:{
      Authorization: 'Bearer ' + token
    }
  })
  return request.then(response => response.data)
}

export default { getAll, addBlog }