import { create } from "zustand";
import axios from "../lib/axios";

const useAuthStore = create((set) => ({
  user: null,

  login: async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password }, { withCredentials: true });
      set({ user: res.data });
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      set({ user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  fetchUser: async () => {
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null });
    }
  }
}));

export default useAuthStore;

