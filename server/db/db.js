import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/note-app");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error while connected to MongoDB", err);
  }
};

export default connectToMongoDB;
