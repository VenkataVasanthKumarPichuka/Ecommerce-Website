import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../Services/CategoryServices";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategoryList(res.data);
  };

  const handleAddCategory = async () => {
    if (!categoryInput.trim()) return;
    await addCategory({ name: categoryInput });
    setCategoryInput("");
    loadCategories();
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  const handleEditCategory = async (cat) => {
    const updated = prompt("Edit category", cat.name);
    if (updated) {
      await updateCategory(cat._id, { name: updated });
      loadCategories();
    }
  };

  const filteredCategories = categoryList.filter((cat) =>
    cat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="bg-slate-100 min-h-screen lg:ml-[2px] p-6" id = "Categories">

      <div className="w-full bg-white p-8 rounded-2xl shadow-lg animate-fadeIn">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Categories
        </h2>

        {/* Top Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

          <input
            className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search category"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap">
            <input
              className="px-4 py-2 border rounded-lg"
              placeholder="New category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />

            <button
              onClick={handleAddCategory}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">

          {filteredCategories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:-translate-y-1 transition"
            >

              <div className="font-medium">{cat.name}</div>

              <div className="flex gap-3 text-lg">

                <button
                  onClick={() => handleEditCategory(cat)}
                  className="text-green-500 hover:scale-110 transition"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="text-red-500 hover:scale-110 transition"
                >
                  <FaTrash />
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}