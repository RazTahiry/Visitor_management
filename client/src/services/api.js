import axios from "axios";
import qs from "qs";

const apiUrl = "http://localhost:8000/api";

export async function getAllVisitors() {
  try {
    const response = await axios.get(`${apiUrl}/visitors`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function getVisitor(visitor) {
  try {
    const response = await axios.get(`${apiUrl}/visitors/${visitor}`);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function addVisitor(formData) {
  try {
    axios
      .post(`${apiUrl}/visitors/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.status, response.data);
        return response.data;
      });
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function editVisitor(visitor, formData) {
  try {
    axios
      .put(`${apiUrl}/visitors/update/${visitor}`, {
        numVisiteur: formData.numVisiteur,
        nom: formData.nom,
        nbJours: formData.nbJours,
        tarifJournalier: formData.tarifJournalier,
      })
      .then((response) => {
        console.log(response.status, response.data);
        return response.data;
      });
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function deleteVisitor(visitor) {
  try {
    axios.delete(`${apiUrl}/visitors/delete/${visitor}`).then((response) => {
      console.log(response.status, response.data);
      return response.data;
    });
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}
