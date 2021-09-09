import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
    // according to https://github.com/axios/axios#example
    // it is possible to use modern async/await with axios
    // it's basically the same but more readable
    try {
        const response = await axios.get(baseUrl)
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        handleError(error)
    }
    // return empty array by default
    return []
}

const addPerson = async (newPerson) => {
    try {
        const response = await axios.post(baseUrl, newPerson)
        if (response.status === 201) {
            return response.data
        }
    } catch (error) {
        handleError(error)
    }
    return {}
}

const handleError = (error) => {
    // for now console.log is enough
    console.log(error)
}

const exports = { getAll, addPerson }

export default exports