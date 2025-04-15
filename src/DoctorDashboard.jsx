import React, { useState, useEffect } from "react";
import axiosInstance from "./axios";
import { motion } from "framer-motion";

const DoctorDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    photo: "",
    description: "",
    skills: "",
    experience: "",
  });
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axiosInstance.get("/doctors/get-all");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addOrUpdateDoctor = async () => {
    if (Object.values(formData).every((val) => val.trim() !== "")) {
      const doctorData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        type: "doctorpage",
      };

      try {
        if (editingDoctor) {
          await axiosInstance.put(`/doctors/update-doctor/${editingDoctor._id}`, doctorData);
        } else {
          await axiosInstance.post("/doctors/create-doctor", doctorData);
        }
        resetForm();
        fetchDoctors();
      } catch (err) {
        console.error("Failed to add or update doctor", err);
      }
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      profession: "",
      photo: "",
      description: "",
      skills: "",
      experience: "",
    });
    setEditingDoctor(null);
  };

  const editDoctor = (doctor) => {
    setFormData({
      name: doctor.name || "",
      profession: doctor.profession || "",
      photo: doctor.photo || "",
      description: doctor.description || "",
      skills: doctor.skills ? doctor.skills.join(", ") : "",
      experience: doctor.experience?.toString() || "",
    });
    setEditingDoctor(doctor);
  };

  const deleteDoctor = async (id) => {
    if (window.confirm("Rostdan ham ushbu doktori o'chirmoqchimisiz?")) {
      try {
        await axiosInstance.delete(`/doctors/delete-doctor/${id}`);
        fetchDoctors();
      } catch (err) {
        console.error("Failed to delete doctor", err);
        alert("O‘chirishga ruxsat yo‘q. Iltimos, tokeningizni yoki rolingizni tekshiring.");
      }
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">Doctor Dashboard</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg mb-8">
        {["name", "profession", "photo", "description", "skills", "experience"].map((field) => (
          <input
            key={field}
            name={field}
            className="border p-2 rounded-lg w-full mb-2"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
          />
        ))}
        <button onClick={addOrUpdateDoctor} className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
          {editingDoctor ? "Update Doctor" : "Add Doctor"}
        </button>
      </div>
      <div className="w-full max-w-4xl grid gap-6">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <motion.div key={doc._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all flex flex-col items-center">
                <img src={doc.photo || "https://via.placeholder.com/100"} alt={doc.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <h2 className="text-xl font-semibold mb-2">{doc.name}</h2>
                <p className="text-gray-600 mb-2">Profession: {doc.profession}</p>
                <p className="text-gray-600 mb-4">Description: {doc.description}</p>
                <p className="text-gray-600 mb-4">Experience: {doc.experience}</p>
                <p className="text-gray-600 mb-4">Skills: {doc.skills?.join(", ")}</p>
                <div className="flex gap-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => editDoctor(doc)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => deleteDoctor(doc._id)}>Delete</button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">Hozircha doktorlar topilmadi.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
