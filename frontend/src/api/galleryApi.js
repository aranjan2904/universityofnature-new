import axios from "axios";

const API_URL = "http://localhost:8080/api/gallery";

export const getGallery = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};