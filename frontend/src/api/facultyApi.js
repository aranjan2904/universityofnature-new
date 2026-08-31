import axios from "axios";

import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/faculty`;

export const getFaculty = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};