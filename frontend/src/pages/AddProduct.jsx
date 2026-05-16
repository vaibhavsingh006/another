import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";
import { addProduct } from "../services/api";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    const data = await addProduct(formData);

    if (data.error) {
      setStatus({ message: data.error, type: "error" });
      return;
    }

    setStatus({ message: data.message, type: "success" });
    setFormData({
      title: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <Navbar />

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md mt-20">

        <h2 className="block text-sm font-medium text-gray-700" >Add Product</h2>

        <form onSubmit={handleSubmit}>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" >Stock</label>
            <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
            />
          </div>


            <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </form>

        {status.message && (
          <div
            className={`mt-4 rounded-md px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-green-100 text-green-900"
                : "bg-red-100 text-red-900"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>

    </div>
  );
};

export default AddProduct;