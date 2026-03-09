import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productServices";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    mrp: "",
    stock: "",
    colors: "",
    sizes: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previewImages = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(previewImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreview = [...preview];

    newImages.splice(index, 1);
    newPreview.splice(index, 1);

    setImages(newImages);
    setPreview(newPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("subcategoryId", "699ec930f206469034a90432");
    formData.append("price", form.price);
    formData.append("mrp", form.mrp);
    formData.append("stock", form.stock);
    formData.append("colors", form.colors);
    formData.append("sizes", form.sizes);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await addProduct(formData);
      alert("Product Added Successfully");
      navigate("/products");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
  

      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-8">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl flex flex-col gap-5"
        >
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            required
            className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="mrp"
            type="number"
            placeholder="MRP"
            onChange={handleChange}
            required
            className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            onChange={handleChange}
            required
            className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Upload Section */}
          <div className="flex items-center gap-4 flex-wrap">
            <label className="bg-indigo-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 text-sm">
              Choose Files
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>

            {/* Image Preview */}
            <div className="flex gap-3 flex-wrap">
              {preview.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-md border"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <input
            name="colors"
            placeholder="Colors (Red,Blue)"
            onChange={handleChange}
            className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="sizes"
            placeholder="Sizes (S,M,L)"
            onChange={handleChange}
            className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            className="bg-green-600 text-white h-12 px-6 rounded-lg hover:bg-green-700 text-base w-full md:w-fit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}