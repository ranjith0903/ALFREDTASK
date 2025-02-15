import mongoose from "mongoose";

const flashCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  box: { type: Number, default: 1 }, 
  nextReview: { type: Date, default: Date.now }
});

const FlashCard = mongoose.model("FlashCard", flashCardSchema);

export default FlashCard;



