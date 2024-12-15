import mongoose from "mongoose";

const weatherSearchSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    searchTag: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("WeatherSearch", weatherSearchSchema);
