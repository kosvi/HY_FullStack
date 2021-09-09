import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

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
        return checkResponse(await axios.post(baseUrl, newPerson), 201)
    } catch (error) {
        handleError(error)
    }
    return {}
}

const checkResponse = (response, status) => {
    if (response.status === status) {
        return response.data
    }
}

const handleError = (error) => {
    // for now console.log is enough
    console.log(error)
}

const exports = { getAll, addPerson }

export default exports