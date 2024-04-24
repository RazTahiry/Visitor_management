import axios from "axios";

const apiUrl = "http://localhost:8000/api";

export async function getAllVisitors() {
  try {
    const response = await axios.get(`${apiUrl}/visitors`);
    if (response.status === 200) {
      // ToastSuccess();
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
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function addVisitor(formData) {
  try {
    const response = await axios.post(`${apiUrl}/visitors/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.status, response.data);
    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}

export async function editVisitor(visitor, formData) {
  try {
    axios
      .put(`${apiUrl}/visitors/${visitor}/update`, {
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
    axios.delete(`${apiUrl}/visitors/${visitor}/delete`).then((response) => {
      console.log(response.status, response.data);
      return response.data;
    });
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}
