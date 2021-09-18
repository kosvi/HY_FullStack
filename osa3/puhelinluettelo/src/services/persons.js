import axios from "axios";

const baseUrl = '/api/persons'

const getAll = async () => {
    // according to https://github.com/axios/axios#example
    // it is possible to use modern async/await with axios
    // it's basically the same but more readable
    try {
        return checkResponse(await axios.get(baseUrl), 200)
    } catch (error) {
        handleError(error)
    }
    // return empty array by default
    return []
}

const addPerson = async (newPerson) => {
    try {
        const response = await axios.post(baseUrl, newPerson)
        return response
    } catch (error) {
        handleError(error)
        return error.response
    }
}

const deletePerson = async (id) => {
    try {
        return checkResponse(await axios.delete(`${baseUrl}/${id}`), 200)
    } catch (error) {
        handleError(error)
    }
    return {}
}

const updatePerson = async (person) => {
    try {
        return checkResponse(await axios.put(`${baseUrl}/${person.id}`, person), 200)
    } catch (error) {
        handleError(error)
        return error.response
    }
}

const checkResponse = (response, status) => {
    if (response.status === status) {
        return response.data
    }
    return null
}

const handleError = (error) => {
    // for now console.log is enough
    console.log(error.response)
}

const exports = { getAll, addPerson, deletePerson, updatePerson }

export default exports