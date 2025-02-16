import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  register: async (name, email, password, confirmPassword) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", 
        { name, email, password, confirmPassword }, 
        { withCredentials: true } 
      );
      set({ user: res.data, loading: false });
      toast.success("Registration successful");
    } catch (error) {
      set({ loading: false });
      console.error("Registration failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password }, { withCredentials: true });
      set({ user: res.data, loading: false });
      toast.success("Login successful");
    } catch (error) {
      set({ loading: false });
      console.error("Login failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile", { withCredentials: true });
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      set({ user: null });
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  },

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/auth/profile", { withCredentials: true });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
      console.error("Failed to fetch user:", error);
      set({ user: null });
    }
  }
}));

export default useAuthStore;

