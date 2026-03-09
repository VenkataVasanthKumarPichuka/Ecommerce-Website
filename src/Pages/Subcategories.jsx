import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  getSubcategories,
  addSubcategory,
  deleteSubcategory,
  updateSubcategory,
} from "../Services/SubCategoryServices";
import { getCategories } from "../Services/CategoryServices";

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    const res = await getSubcategories();
    setSubcategories(res.data);
  };

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
    if (res.data.length > 0) {
      setSelectedCategory(res.data[0]._id);
    }
  };

  const handleAdd = async () => {
    if (!newSubcategory.trim()) return alert("Enter subcategory name");

    await addSubcategory({
      name: newSubcategory,
      categoryId: selectedCategory,
    });

    setNewSubcategory("");
    fetchSubcategories();
  };

  const handleEdit = async (item) => {
    const updated = prompt("Edit Subcategory", item.name);
    if (!updated) return;

    await updateSubcategory(item._id, {
      name: updated,
      categoryId: item.categoryId,
    });

    fetchSubcategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subcategory?")) return;
    await deleteSubcategory(id);
    fetchSubcategories();
  };

  const filteredData = subcategories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex justify-center p-5 bg-slate-100 min-h-screen lg:ml-6 transition-all">

      <div className="w-full max-w-6xl bg-white p-7 rounded-2xl shadow-lg animate-fadeIn">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
          Subcategories
        </h2>

        {/* Controls */}
        <div className="flex flex-wrap gap-5 justify-between items-center mb-6">

          {/* Search */}
          <input
            type="text"
            placeholder="Search subcategory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />

          {/* Add Section */}
          <div className="flex flex-wrap gap-3">

            <input
              type="text"
              placeholder="New subcategory"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              className="px-4 py-2 border rounded-lg min-w-[160px]"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg min-w-[160px]"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAdd}
              className="px-5 py-2 text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">

          {filteredData.length === 0 ? (
            <p className="text-center text-slate-500 p-6">
              No subcategories found
            </p>
          ) : (
            filteredData.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:-translate-y-1 transition"
              >

                <h4 className="font-medium">{item.name}</h4>

                <div className="flex gap-3">

                  <button
                    onClick={() => handleEdit(item)}
                    className="text-green-500 hover:scale-125 transition"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:scale-125 transition"
                  >
                    <FaTrash />
                  </button>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}