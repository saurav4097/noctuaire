import mongoose, { Schema, model, models } from "mongoose";

const apisSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  url: { type: String, required: true },
  number: { type:Number, required:true }
});

const Apis = models.Apis || mongoose.model("Apis", apisSchema);
export default Apis;