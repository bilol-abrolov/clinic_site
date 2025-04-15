import { useState } from "react";
import { Link } from "react-router-dom"; // React Router'dan Link import qilamiz
import { FaHome, FaUsers, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Ikkonalarni import qilamiz

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 p-4`}>
      <ul>
        <Link to="/">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal mt-[60px]"><FaHome size={18} /> Home</li>
        </Link>
        <Link to="/doctors">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal"><FaUsers size={18} /> Doctors</li>
        </Link>
        <Link to="/products">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal">🛒 Products</li>
        </Link>
        <Link to="/settings">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal"><FaCog size={18} /> Settings</li>
        </Link>
        <Link to="/logout">
          <li className="p-2 flex items-center gap-2 hover:bg-red-700 rounded-md text-lg font-normal"><FaSignOutAlt size={18} /> Logout</li>
        </Link>
      </ul>
    </div>
  );
};

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar holatini boshqarish uchun useState qo'shildi
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [language, setLanguage] = useState("en");

  // Handlerlar
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    alert("Profile updated!");
    // Profile update API call here
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    alert("Password changed!");
    // Password change API call here
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    alert(`Language set to ${e.target.value}`);
    // Language change logic here
  };

  return (
    <>
      {/* Sidebarni ochish/yopish tugmasi */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gray-800 text-white rounded-md fixed top-6 left-6 z-50"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Asosiy kontent */}
      <div className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}>
        <div className="min-h-screen py-10 px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-8">Settings</h1>

            {/* Profile settings */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
              <form onSubmit={handleSubmitProfile}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
              </form>
            </div>

            {/* Password settings */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handleSubmitPassword}>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-lg font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your current password"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-lg font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter your new password"
                    required
                  />
                </div>

                <button type="submit" className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Change Password
                </button>
              </form>
            </div>

            {/* Language settings */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Language Settings</h2>
              <div className="mb-4">
                <label htmlFor="language" className="block text-lg font-medium text-gray-700">Select Language</label>
                <select
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                >
                  <option value="en">English</option>
                  <option value="uz">Uzbek</option>
                  <option value="ru">Russian</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
