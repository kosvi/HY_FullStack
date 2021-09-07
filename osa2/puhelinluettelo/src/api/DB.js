export default class DB {

    static #apiBase = "http://localhost:3001/persons"

    static async getPersons() {
        try {
            const response = await InternalMethods.getData(this.#apiBase)
            if (response !== null && response.status === 200) {
                const persons = await response.json()
                return persons
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

class InternalMethods {
    static async getData(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }
}