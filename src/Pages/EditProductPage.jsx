import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../Services/ProductServices";

const EditProductPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    mrp: "",
    price: "",
    stock: "",
    colors: [],
    sizes: [],
    images: []
  });

  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  // LOAD PRODUCT
const loadProduct = async () => {
  try {

    const data = await getProductById(id);


    if (!data) {
      console.log("Product not found");
      return;
    }

    setProduct({
      name: data.name || "",
      mrp: data.mrp || "",
      price: data.price || "",
      stock: data.stock || "",
      colors: data.colors || [],
      sizes: data.sizes || [],
      images: data.images || []
    });

    if (data.images && data.images.length > 0) {
      setPreview(data.images[0]);
    }

    setLoading(false);

  } catch (err) {
    console.log("Load Product Error:", err);
    setLoading(false);
  }
};
  useEffect(() => {
    loadProduct();
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value
    });
  };

  // ARRAY CHANGE
  const handleArrayChange = (e, field) => {

    const value = e.target.value.split(",").map(v => v.trim());

    setProduct({
      ...product,
      [field]: value
    });

  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }

  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {

    try {

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("mrp", product.mrp);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("colors", JSON.stringify(product.colors));
      formData.append("sizes", JSON.stringify(product.sizes));

      if (newImage) {
        formData.append("image", newImage);
      }

      await updateProduct(id, formData);

      alert("Product Updated Successfully");

      navigate("/products");

    } catch (err) {
      console.log("Update Error:", err);
      alert("Update Failed");
    }

  };

  if (loading) return <div>Loading...</div>;

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Edit Product
      </h1>

      <div className="space-y-4 max-w-md">

        {/* IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="Product"
            className="w-full h-48 object-cover rounded"
          />
        )}

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          name="mrp"
          value={product.mrp}
          onChange={handleChange}
          placeholder="MRP"
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          value={product.colors.join(", ")}
          onChange={(e)=>handleArrayChange(e,"colors")}
          placeholder="Colors (Red, Blue)"
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          value={product.sizes.join(", ")}
          onChange={(e)=>handleArrayChange(e,"sizes")}
          placeholder="Sizes (S, M, L)"
          className="border p-2 w-full rounded"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>

      </div>

    </div>
  );

};

export default EditProductPage;