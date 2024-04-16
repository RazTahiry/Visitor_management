import axios from 'axios'

const apiUrl = 'http://localhost:8000/api'

export async function getAllVisitors() {
    try {
        const response = await axios.get(`${apiUrl}/visiteurs`)
        return response.data;
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}


export async function getVisitor(visitor) {
    try {
        const response = await axios.get(`${apiUrl}/visiteurs/${visitor}`)
        return response.data;
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}


export async function editVisitor(visitor) {
    try {
        const response = await axios.put(`${apiUrl}/visiteurs/update/${visitor}`)
        return response.data;
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}


export async function deleteVisitor(visitor) {
    try {
        const response = await axios.delete(`${apiUrl}/visiteurs/delete/${visitor}`)
        return response.data;
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}

