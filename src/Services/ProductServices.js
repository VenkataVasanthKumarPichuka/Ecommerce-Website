import axios from "axios";

const API_URL = "https://fashion-spot.onrender.com/api/products";

// GET products
export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
};

// GET product by id
export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// ADD product
export const addProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

// UPDATE product
export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

// DELETE product
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};