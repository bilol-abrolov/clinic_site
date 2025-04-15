import React, { useState } from "react";
import { Menu, Users, FileText, Settings, LogOut } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Link } from "react-router-dom";

const data = [
  { name: "Jan", doctors: 10, products: 20, users: 50, revenue: 5000 },
  { name: "Feb", doctors: 15, products: 25, users: 80, revenue: 8000 },
  { name: "Mar", doctors: 20, products: 30, users: 120, revenue: 12000 },
  { name: "Apr", doctors: 25, products: 35, users: 150, revenue: 15000 },
  { name: "May", doctors: 30, products: 40, users: 200, revenue: 20000 },
];

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 p-4`}
    >
      <ul>
        <Link to="/doctors">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal mt-[60px]"><Users size={18} /> Doctors</li>
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

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white rounded-md fixed top-4 left-4 z-50"
      >
        <Menu size={24} />
      </button>
      <Sidebar isOpen={isOpen} />
      <div className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left ml-[20px]">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold text-green-500">$125,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Doctors</h2>
            <p className="text-3xl font-bold text-blue-500">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-purple-500">1,540</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Top Selling Product</h2>
            <p className="text-3xl font-bold text-orange-500">Ibuprofen</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="doctors" stroke="#3498db" strokeWidth={2} />
              <Line type="monotone" dataKey="products" stroke="#2ecc71" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#9b59b6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Doctors</h2>
            <ul>
              <li className="border-b p-2">Dr. John Doe</li>
              <li className="border-b p-2">Dr. Sarah Smith</li>
              <li className="border-b p-2">Dr. Alex Johnson</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <ul>
              <li className="border-b p-2">Order #1234 - Pending</li>
              <li className="border-b p-2">Order #1235 - Completed</li>
              <li className="border-b p-2">Order #1236 - Shipped</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
