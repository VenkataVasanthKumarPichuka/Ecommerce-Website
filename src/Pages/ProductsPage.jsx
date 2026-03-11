import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../Services/ProductServices";

import { FaTrash, FaEdit } from "react-icons/fa";

const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-700">
        All Products
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >

            <img
              src={product.images?.[0] || "https://via.placeholder.com/300"}
              alt={product.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold text-lg mb-2">
                {product.name}
              </h2>

              <p className="text-gray-500 text-sm mb-2">
                
              </p>

              <p className="text-blue-600 font-bold text-xl mb-4">
                ₹{product.price}
              </p>

              <div className="flex justify-between">

                <button
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                  
                  className="flex items-center gap-2 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProductsPage;
