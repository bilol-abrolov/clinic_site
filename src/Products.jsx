import React, { useState, useEffect } from "react";
import { Plus, Trash, Users, Settings, LogOut, Menu, Pencil } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 p-4`}>
      <ul>
        <Link to="/">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal mt-[60px]"><FaHome size={18} /> Home</li>
        </Link>
        <Link to="/doctors">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal"><Users size={18} /> Doctors</li>
        </Link>
        <Link to="/products">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal">🛒 Products</li>
        </Link>
        <Link to="/settings">
        <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal"><Settings size={18} /> Settings</li>
        </Link>
        <Link to="logout">
        <li className="p-2 flex items-center gap-2 hover:bg-red-700 rounded-md text-lg font-normal"><LogOut size={18} /> Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const Button = ({ children, className, onClick, type = "button" }) => (
  <button
    type={type}
    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    photo: "",
    category: "",
    price: "",
    description: "",
  });

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTQyNWQ4NGNmOGZkOWRiNTNlNDk3MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NDExNzQ1OCwiZXhwIjoxNzQ0NzIyMjU4fQ.-w4BKZdgJH6qD5UnJU4etZ-34AJM6_4d3hGF03bEKkY"; // Replace with actual token

  useEffect(() => {
    axios.get("https://spec-repo-origin.onrender.com/products/get-all")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Xatolik productlarni olishda:", error));
  }, []);

  const handleAddProduct = () => {
    setFormData({
      photo: "",
      category: "",
      price: "",
      description: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      photo: formData.photo || "",
      category: formData.category || "",
      price: formData.price || "",
      description: formData.description || "",
    };

    if (isEditing) {
      // Update product
      axios.put(`https://spec-repo-origin.onrender.com/products/update-product/${editingProductId}`, productData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
        .then((res) => {
          const updated = products.map((prod) => prod._id === editingProductId ? res.data : prod);
          setProducts(updated);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error during update:", error);
          alert(`Error: ${error.response?.data?.message || 'An unknown error occurred'}`);
        });
    } else {
      axios.post("https://spec-repo-origin.onrender.com/products/create-product", productData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
        .then((res) => {
          setProducts([...products, res.data]);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error during creation:", error);
          alert(`Error: ${error.response?.data?.message || 'An unknown error occurred'}`);
        });
    }

    setFormData({ photo: "", category: "", price: "", description: "" });
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`https://spec-repo-origin.onrender.com/products/delete-product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setProducts(products.filter((product) => product._id !== id)))
      .catch((error) => {
        console.error("O'chirishda xatolik:", error);
        console.log("Full delete error:", error.response?.data);
      });
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProductId(product._id);
    setFormData({
      photo: product.photo || "",
      category: product.category || "",
      price: product.price || "",
      description: product.description || "",
    });
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gray-800 text-white rounded-md fixed top-6 left-6 z-50"
      >
        <Menu size={24} />
      </button>
      <Sidebar isOpen={isOpen} />
      <div className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>
        <div className="min-h-screen">
          <Card className="w-full max-w-7xl mx-auto">
            <CardContent>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-800">Productlar ro'yxati</h2>
                <Button onClick={handleAddProduct} className="flex gap-3 items-center">
                  <Plus size={20} /> Yangi productlar qo'shish
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-6 py-4">Photo</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id} className="border-b hover:bg-gray-50">
                          <td className="px-8 py-4"><img className="w-24 h-auto" src={product.photo} alt="Product" /></td>
                          <td className="px-8 py-4">{product.category}</td>
                          <td className="px-8 py-4">{product.price}</td>
                          <td className="px-8 py-4">{product.description}</td>
                          <td className="px-8 py-6 flex gap-2">
                            <Button onClick={() => handleEditProduct(product)} className="bg-yellow-500 hover:bg-yellow-600">
                              <Pencil size={18} />
                            </Button>
                            <Button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 hover:bg-red-600">
                              <Trash size={18} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">Hech qanday productlar topilmadi</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </CardContent>
          </Card>

          {showModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  {isEditing ? "Productni tahrirlash" : "Yangi product qo'shish"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="photo" placeholder="Rasm URL" value={formData.photo} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="description" placeholder="Tavsif" value={formData.description} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <div className="flex justify-end gap-3 pt-6">
                    <Button type="button" className="bg-gray-400 hover:bg-gray-500" onClick={() => setShowModal(false)}>Bekor qilish</Button>
                    <Button type="submit">{isEditing ? "Yangilash" : "Saqlash"}</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
