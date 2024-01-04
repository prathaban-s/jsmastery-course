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
    // Using the mongourl directly for testing
    await mongoose.connect(
      "mongodb+srv://prathap9943015:qkqSTqSwQ7jCXDvi@js-mastery-course.znzdkwd.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "Project0",
      }
    );
    isConnected = true;
    console.log("Mongo DB is Running");
  } catch (err) {
    console.log(err);
  }
};
