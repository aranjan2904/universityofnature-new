import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/contact`;

export const sendContactMessage = async (message) => {
  const response = await axios.post(API_URL, message);
  return response.data;
};