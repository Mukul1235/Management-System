import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({
  baseURL: "https://managementsystemapi.onrender.com/api/",
});

export const createCustomer = (data) => API.post("/customers/", data);
// export const createPayment = (data) => API.post("/payments/", data);
export const fetchCustomers = async () => {
  try {
    const response = await API.get(`/customers/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getPayment = async (customer_id) => {
  try {
    const response = await API.get(`/payments/${customer_id}/`); // Use backticks for string interpolation
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error); // Corrected the error message
    throw error;
  }
};

export const createPayment = async (customerId, data) => {
  try {
    const response = await API.post(`/payments/${customerId}/`, data); // Corrected parameter naming
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error); // Clarified the error message
    throw error;
  }
};
