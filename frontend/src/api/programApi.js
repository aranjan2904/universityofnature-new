import axios from "axios";

import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/programs`;

export const getPrograms = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("PROGRAM API RESPONSE:", response.data);
    return response.data;
  } catch (error) {
    console.error("PROGRAM API ERROR:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);
    throw error;
  }
};