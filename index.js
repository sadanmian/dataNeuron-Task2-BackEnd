import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDatabase from "./configs/db.js";
import Counter from "./models/counterModel.js";
import User from "./models/userModel.js";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    let data = await User.find();
    data = data.at(-1);

    return res
      .status(200)
      .send({ message: "Data Get Successfully", data: [data] });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const { method } = req;
    const checkReq = await Counter.findOne({ method: "POST" });
    console.log(checkReq);
    if (!checkReq) {
      const newCounter = new Counter({ method, count: 1 });
      await newCounter.save();
    } else {
      const updateCount = await Counter.findByIdAndUpdate(
        { _id: checkReq._id },
        { $inc: { count: 1 } },
        { returnDocument: "after" }
      );
    }
    const data = req.body;
    console.log(req.body);
    const insertObj = new User(data);
    let inserted = await insertObj.save();
    return res
      .status(200)
      .send({ message: "Data add successfully", user: inserted });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
// ----------------------------------------------------------------

app.patch("/", async (req, res) => {
  try {
    const { method } = req;
    const checkReq = await Counter.findOne({ method: "PATCH" });
    console.log(checkReq);
    if (!checkReq) {
      const newCounter = new Counter({ method, count: 1 });
      await newCounter.save();
    } else {
      const updateCount = await Counter.findByIdAndUpdate(
        { _id: checkReq._id },
        { $inc: { count: 1 } },
        { returnDocument: "after" }
      );
    }
    const data = req.body;
    const { _id, ...newData } = data;
    const updateData = await User.findByIdAndUpdate(
      { _id },
      { $set: newData },
      { returnDocument: "after" }
    );
    return res
      .status(200)
      .send({ message: "Data update successfully", updateData });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
app.get("/counter", async (req, res) => {
  try {
    const data = await Counter.find();
    return res.status(200).send({ message: "Data Get Successfully", data });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// ------------------------------------------------------------------
app.listen(process.env.PORT, async (req, res) => {
  try {
    await connectToDatabase();
    console.log("PORT is listening on" + " " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});

export default app;
