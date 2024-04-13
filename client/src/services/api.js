import axios from 'axios'

const apiUrl = 'http://localhost:8000/api'

export async function getAllVisitors() {
    try {
        const reponse = await axios.get(`${apiUrl}/visiteurs`)
        return reponse.data;
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}
