import axios from 'axios'
const baseUrl = 'https://phonebook-dawn-smoke-4110.fly.dev/api/persons'


const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = (id) => {
    const id_url = `/${id}`
    const delete_url = baseUrl.concat(id_url)
    console.log(delete_url)
    return axios.delete(delete_url)
}
const update = (id, newObject) => {
    const id_url = `/${id}`
    const update_url = baseUrl.concat(id_url)
    console.log(update_url)
    return axios.put(update_url, newObject)
}

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
}