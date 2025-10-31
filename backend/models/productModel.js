import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerPerson: { type: Number, required: true },
    durationDays: { type: Number, required: true },
    images: [String],
    includes: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
