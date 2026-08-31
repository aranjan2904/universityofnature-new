import axios from "axios";

import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/gallery`;

export const getGallery = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};