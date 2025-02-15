import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,

  register: async (name, email, password) => {
    try {
      const res = await axios.post("/auth/register", 
        { name, email, password }, 
        { withCredentials: true } 
      );
      set({ user: res.data });
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  },

  login: async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password },{ withCredentials: true });
      set({ user: res.data });
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout",{},{ withCredentials: true });
      set({ user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  fetchUser: async () => {
    try {
      const res = await axios.get("/auth/profile",{ withCredentials: true });
      set({ user: res.data });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null });
    }
  }
}));

export default useAuthStore;

