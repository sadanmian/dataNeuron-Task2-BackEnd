// counterModel.js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("counter", counterSchema);

export default Counter;
