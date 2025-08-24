import mongoose, { Schema, model, models } from "mongoose";

const brandsSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  number: { type: Number, required: true }
});

const Brands = models.Brands || mongoose.model("Brands", brandsSchema);
export default Brands;