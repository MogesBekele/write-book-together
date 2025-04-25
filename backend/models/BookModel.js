import mongoose from "mongoose";

const ContributionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  contributor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
});

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the User model
  contributions: [ContributionSchema], // Array of contributions
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
