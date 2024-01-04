import mongoose from "mongoose";

let isConnected: boolean = false;

export const connnectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGDB URL");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Project0",
    });
    isConnected = true;
    console.log("Mongo DB is Running");
  } catch (err) {
    console.log(err);
  }
};
