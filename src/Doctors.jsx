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
        <Link to="/logout">
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

const Doctors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    photo: "",
    description: "",
    skills: "",
    experience: "",
    type: "",
  });

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTQyNWQ4NGNmOGZkOWRiNTNlNDk3MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NDExNzQ1OCwiZXhwIjoxNzQ0NzIyMjU4fQ.-w4BKZdgJH6qD5UnJU4etZ-34AJM6_4d3hGF03bEKkY"; // Tokenni shu yerga qo'y

  useEffect(() => {
    axios.get("https://spec-repo-origin.onrender.com/doctors/get-all")
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Xatolik doctorlarni olishda:", error));
  }, []);

  const handleAddDoctor = () => {
    setFormData({ name: "", profession: "", photo: "", description: "", skills: "", experience: "", type: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const doctorData = {
      ...formData,
      skills: formData.skills.split(",").map(s => s.trim()),
    };

    if (isEditing) {
      // update doctor
      axios.put(`https://spec-repo-origin.onrender.com/doctors/update-doctor/${editingDoctorId}`, doctorData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
        .then((res) => {
          const updated = doctors.map((doc) => doc._id === editingDoctorId ? res.data : doc);
          setDoctors(updated);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("O'chirishda xatolik:", error);
          console.log("Full delete error:", error.response?.data);
          alert(`Error: ${error.response?.data?.message || 'An unknown error occurred'}`);
        });

    } else {
      // create new doctor
      axios.post("https://spec-repo-origin.onrender.com/doctors/create-doctor", doctorData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
        .then((res) => {
          setDoctors([...doctors, res.data]);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Qo'shishda xato:", error);
          console.log("Full error:", error.response?.data);
        });
    }

    setFormData({ name: "", profession: "", photo: "", description: "", skills: "", experience: "", type: "" });
  };

  const handleDeleteDoctor = (id) => {
    axios.delete(`https://spec-repo-origin.onrender.com/doctors/delete-doctor/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setDoctors(doctors.filter((doctor) => doctor._id !== id)))
      .catch((error) => {
        console.error("O'chirishda xatolik:", error);
        console.log("Full delete error:", error.response?.data);
      });
  };

  const handleEditDoctor = (doctor) => {
    setIsEditing(true);
    setEditingDoctorId(doctor._id);
    setFormData({
      name: doctor.name || "",
      profession: doctor.profession || "",
      photo: doctor.photo || "",
      description: doctor.description || "",
      skills: (doctor.skills || []).join(", "),
      experience: doctor.experience || "",
      type: doctor.type || "",
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
                <h2 className="text-3xl font-semibold text-gray-800">Doktorlar ro'yxati</h2>
                <Button onClick={handleAddDoctor} className="flex gap-3 items-center">
                  <Plus size={20} /> Yangi doktor qo'shish
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Profession</th>
                      <th className="px-6 py-4">Photo</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Skills</th>
                      <th className="px-6 py-4">Experience</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {doctors.length > 0 ? (
                      doctors.map((doctor) => (
                        <tr key={doctor._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-4">{doctor.name}</td>
                          <td className="px-4 py-4">{doctor.profession}</td>
                          <td className="px-5 py-4"><img className="w-28 h-auto rounded-xl" src={doctor.photo} alt="Doctor" /></td>
                          <td className="px-4 py-4">{doctor.description}</td>
                          <td className="px-4 py-4">{doctor.skills?.join(", ")}</td>
                          <td className="px-[60px] py-4">{doctor.experience}</td>
                          <td className="px-4 py-4">{doctor.type}</td>
                          <td className="px-6 py-9 flex gap-2">
                            <Button onClick={() => handleEditDoctor(doctor)} className="bg-yellow-500 hover:bg-yellow-600">
                              <Pencil size={18} />
                            </Button>
                            <Button onClick={() => handleDeleteDoctor(doctor._id)} className="bg-red-500 hover:bg-red-600">
                              <Trash size={18} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">Hech qanday doktor topilmadi</td>
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
                  {isEditing ? "Doktorni tahrirlash" : "Yangi doktor qo'shish"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="name" placeholder="Ism Familiya" value={formData.name} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" required />
                  <input name="profession" placeholder="Yo'nalish" value={formData.profession} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="photo" placeholder="Rasm URL" value={formData.photo} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="description" placeholder="Tavsif" value={formData.description} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="skills" placeholder="Ko'nikmalar (vergul bilan)" value={formData.skills} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="experience" placeholder="Tajriba (yil)" value={formData.experience} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
                  <input name="type" placeholder="Turi (homepage yoki boshqalar)" value={formData.type} onChange={handleInputChange} className="w-full border px-4 py-3 rounded-lg" />
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

export default Doctors;
