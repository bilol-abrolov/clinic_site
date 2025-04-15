import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, X, Menu, Settings, Users, Home } from "lucide-react";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 p-4 z-40`}
    >
      <ul>
        <Link to="/">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal mt-[60px]">
            <Home size={18} /> Home
          </li>
        </Link>
        <Link to="/doctors">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal">
            <Users size={18} /> Doctors
          </li>
        </Link>
        <Link to="/products">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal">
            🛒 Products
          </li>
        </Link>
        <Link to="/settings">
          <li className="p-2 flex items-center gap-2 hover:bg-gray-700 rounded-md text-lg font-normal">
            <Settings size={18} /> Settings
          </li>
        </Link>
        <Link to="/logout">
          <li className="p-2 flex items-center gap-2 hover:bg-red-700 rounded-md text-lg font-normal">
            <LogOut size={18} /> Logout
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default function LogoutConfirm() {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gray-800 text-white rounded-md fixed top-6 left-6 z-50"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
      ></div>

      {/* Logout Button */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 mt-5">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300"
        >
          Logout
        </button>

        {/* Logout Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md text-center relative animate-scale-fade">
              {/* Close icon */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="mx-auto bg-red-100 w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow-sm">
                <LogOut className="text-red-500 w-8 h-8" />
              </div>

              {/* Text */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Tizimdan chiqmoqchimisiz?
              </h2>
              <p className="text-gray-500 mb-6">
                Logout bosilsa, siz hisobdan chiqasiz va login sahifaga
                yo'naltirilasiz.
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 shadow-md transition-all"
                >
                  Ha, chiqish
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
