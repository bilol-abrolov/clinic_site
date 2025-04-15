import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://spec-repo-1.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        alert("Tizimga muvaffaqiyatli kirdingiz! ✅");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        alert(data.error || "Login yoki parol noto‘g‘ri");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Server bilan ulanishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };
  
  return (  
    <div className="w-full h-screen flex">
      <div className="w-1/2 relative hidden md:block">
        <img
          src="https://www.bhg.com/thmb/bfuasUNBsJuQAUPMRZraeatosrk=/2001x0/filters:no_upscale():strip_icc()/BHGJune2022_003_preview-05073e6878b949b0bf1599fab5f02cbc.jpg"
          alt="decor"
          className="w-full h-full p-[20px] object-cover"
        />
        <div className="absolute top-60 left-12 text-white max-w-md drop-shadow-xl">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Turn your ideas <br /> into reality
          </h1>
          <p className="text-lg">
            Start for free and get attractive offers from the community
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-md">
          <div className="mb-8 text-center">
            <span className="text-sm text-gray-500 font-medium">
              ✶ Interactive Brand
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-2">Login</h2>
            <p className="text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Remember for 30 days
              </label>
              <a href="#" className="text-black font-medium hover:underline">
                Forgot Password
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Loading..." : "Log in"}
            </button>

            {/* Register tugmasini Link orqali qildik */}
            <Link to="/register">
              <button
                type="button"
                className="w-full border py-3 rounded-lg hover:bg-gray-100 transition mt-2"
              >
                Register
              </button>
            </Link>

            <div className="flex items-center gap-2 my-4">
              <div className="border-t w-full"></div>
              <p className="text-gray-500 text-sm">or</p>
              <div className="border-t w-full"></div>
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FcGoogle size={22} /> Log in with Google
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Hisobingiz yo‘qmi?{" "}
            <Link to="/register" className="text-black font-semibold hover:underline">
              Bepul ro‘yxatdan o‘ting
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
