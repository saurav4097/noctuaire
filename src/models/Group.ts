import mongoose, { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description1: { type: String, required: true },
  description2: { type: String, required: true },
  number: { type: Number, required: true }
});

// 🛡 Defensive check: fall back to mongoose.models if models is undefined
const Group = (mongoose.models?.Group as mongoose.Model<any>) ||
              model("Group", groupSchema, "group");

export default Group;