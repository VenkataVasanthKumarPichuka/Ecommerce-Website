import API from "./api";

export const getSubcategories = () =>
  API.get("/subcategories");

export const addSubcategory = (data) =>
  API.post("/subcategories", data);

export const deleteSubcategory = (id) =>
  API.delete(`/subcategories/${id}`);

export const updateSubcategory = (id, data) =>
  API.put(`/subcategories/${id}`, data);