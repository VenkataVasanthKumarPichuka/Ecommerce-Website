import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../Services/ProductServices";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    subcategoryId: "",
    mrp: "",
    price: "",
    stock: "",
    sizes: "",
    colors: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [fetching, setFetching] = useState(true); // GET loading
  const [loading, setLoading] = useState(false); // PUT loading
  const [message, setMessage] = useState(null); // status message
  const [messageType, setMessageType] = useState(""); // success | error

  // =====================
  // Fetch product by ID
  // =====================
  const loadProduct = async () => {
    setFetching(true);
    try {
      const data = await getProductById(id); // <- data is the product object

      setProduct({
        name: data.name || "",
        subcategoryId: data.subcategoryId || "",
        mrp: data.mrp || "",
        price: data.price || "",
        stock: data.stock || "",
        sizes: data.sizes?.join(",") || "",
        colors: data.colors?.join(",") || "",
      });

      if (data.images?.length > 0) setPreview(data.images[0]);

      setMessage("Product loaded successfully ✅");
      setMessageType("success");
    } catch (err) {
      setMessage(`Error loading product: ${err.message}`);
      setMessageType("error");
    }
    setFetching(false);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // =====================
  // Update product
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("subcategoryId", product.subcategoryId);
      formData.append("mrp", product.mrp);
      formData.append("price", product.price);
      formData.append("stock", product.stock);

      product.sizes.split(",").forEach((size) =>
        formData.append("sizes", size.trim())
      );
      product.colors.split(",").forEach((color) =>
        formData.append("colors", color.trim())
      );

      if (image) formData.append("images", image);

      const res = await updateProduct(id, formData);

      if (res.status >= 200 && res.status < 300) {
        setMessage("Product updated successfully ✅");
        setMessageType("success");
        navigate("/products");
      } else {
        setMessage(`Error ${res.status}: Failed to update product`);
        setMessageType("error");
      }
    } catch (err) {
      setMessage(`Server Error: ${err.message}`);
      setMessageType("error");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

        {/* Status Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Loading Spinner */}
        {fetching ? (
          <p className="text-center py-10 text-gray-500">Loading product...</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
            <input
              name="name"
              value={product.name}
              placeholder="Product Name"
              onChange={handleChange}
              required
              className="w-full h-12 px-4 border rounded-lg"
            />

            <input
              name="price"
              type="number"
              value={product.price}
              placeholder="Price"
              onChange={handleChange}
              required
              className="w-full h-12 px-4 border rounded-lg"
            />

            <input
              name="mrp"
              type="number"
              value={product.mrp}
              placeholder="MRP"
              onChange={handleChange}
              required
              className="w-full h-12 px-4 border rounded-lg"
            />

            <input
              name="stock"
              type="number"
              value={product.stock}
              placeholder="Stock"
              onChange={handleChange}
              required
              className="w-full h-12 px-4 border rounded-lg"
            />

            {/* Image Upload */}
            <div className="flex items-center gap-4 flex-wrap">
              <label className="bg-indigo-600 text-white px-5 py-2 rounded-lg cursor-pointer">
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded border"
                />
              )}
            </div>

            <input
              name="colors"
              value={product.colors}
              placeholder="Colors (Red,Blue)"
              onChange={handleChange}
              className="w-full h-12 px-4 border rounded-lg"
            />

            <input
              name="sizes"
              value={product.sizes}
              placeholder="Sizes (S,M,L)"
              onChange={handleChange}
              className="w-full h-12 px-4 border rounded-lg"
            />

            <button
              disabled={loading}
              className="bg-green-600 text-white h-12 px-6 rounded-lg hover:bg-green-700"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;