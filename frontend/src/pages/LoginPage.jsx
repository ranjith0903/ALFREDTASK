import { useState } from "react";
import useAuth from "../store/useAuthStore.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, error, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p className="text-sm mt-2">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

