import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/recent-activity`;

export const getRecentActivities = async (enabled = null) => {
  const params = enabled !== null ? { enabled } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const uploadRecentActivity = async (formData) => {
  const response = await axios.post(`${API_URL}/upload`, formData);
  return response.data;
};

export const deleteRecentActivity = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateRecentActivity = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const updateRecentActivityOrder = async (id, order) => {
  const response = await axios.patch(`${API_URL}/${id}/order`, { order });
  return response.data;
};
