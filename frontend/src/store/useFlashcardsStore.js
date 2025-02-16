import { create } from "zustand";
import axios from "../lib/axios";

const useFlashcardsStore = create((set, get) => ({
  flashcards: [],
  isLoading: false,
  currentIndex: 0,
  dueFlashcardsCount: 0,
  totalcards:0,
  
//fetch flashcards
  fetchFlashcards: async () => {
    try {
      set({ isLoading: true });
      const res = await axios.get("/flashcards/due", { withCredentials: true });

      set({ 
        flashcards: res.data, 
        dueFlashcardsCount: res.data.length, 
        isLoading: false, 
        currentIndex: 0 
      });
    } catch (error) {
      console.error("Error fetching flashcards", error);
      set({ isLoading: false });
    }
  },

  //fetch all flashcards

  fetchAllFlashcards: async () => {
    try {
      set({ isLoading: true });
      const res = await axios.get("/flashcards", { withCredentials: true });

      set({ flashcards: res.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching all flashcards", error);
      set({ isLoading: false });
    }
  },

  //create flashcard
  createFlashcard: async (flashcardData) => {
    try {
      const res = await axios.post("/flashcards", flashcardData, { withCredentials: true });

      set((state) => ({
        flashcards: [...state.flashcards, res.data],
        dueFlashcardsCount: state.dueFlashcardsCount + 1
      }));
    } catch (error) {
      console.error("Error creating flashcard", error);
    }
  },
//updateFlashcard
  updateFlashcard: async (id, correct) => {
    try {
      await axios.put(`/flashcards/${id}`, { correct }, { withCredentials: true });

      set((state) => {
        let updatedFlashcards = state.flashcards.filter((card) => card._id !== id);
        let newIndex = Math.min(state.currentIndex, updatedFlashcards.length - 1);

        return { 
          flashcards: updatedFlashcards, 
          currentIndex: newIndex,
          dueFlashcardsCount: Math.max(state.dueFlashcardsCount - 1, 0)
        };
      });

      if (get().flashcards.length === 0) {
        setTimeout(() => get().fetchFlashcards(), 300); 
      }
    } catch (error) {
      console.error("Error updating flashcard", error);
    }
  },

  //deleteFlashcard

  deleteFlashcard: async (id) => {
    try {
      await axios.delete(`/flashcards/${id}`, { withCredentials: true });

      set((state) => ({
        flashcards: state.flashcards.filter((card) => card._id !== id),
        dueFlashcardsCount: Math.max(state.dueFlashcardsCount - 1, 0)
      }));

      if (get().flashcards.length === 0) {
        setTimeout(() => get().fetchFlashcards(), 300);
      }
    } catch (error) {
      console.error("Error deleting flashcard", error);
    }
  },
  
//nextFlashcard
  nextFlashcard: () => {
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.flashcards.length - 1)
    }));
  }
}));

export default useFlashcardsStore;


