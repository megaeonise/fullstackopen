import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (object) => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const incrementVote = async (object) => {
  const id_url = `/${object.id}`
  const update_url = baseUrl.concat(id_url)
  let newObject = Object.assign({}, object)
  newObject.votes += 1
  await axios.put(update_url, newObject)
}

export default { 
  getAll, 
  createNew,
  incrementVote
}