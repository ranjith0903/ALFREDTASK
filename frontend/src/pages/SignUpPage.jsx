import { useState } from "react";
import useAuth from "../store/useAuthStore.js";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, error, loading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form.name, form.email, form.password, form.confirmPassword);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md w-full md:w-96 mx-auto"
      >
        <h2 className="text-xl font-bold text-center">
          Sign Up
        </h2>
        {error && (
          <p className="text-red-500 text-sm md:text-base md:mt-2">
            {error}
          </p>
        )}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 dark:bg-gray-700 dark:text-white"
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full md:w-auto"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
        <p className="text-sm mt-2 md:text-base md:mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

