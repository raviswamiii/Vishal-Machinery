import mongoose from "mongoose";

const databaseConnection = async () => {
  mongoose.connection.on("connected", () => {
    console.log("🗄️ Connected to database.");
  });

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env");
  }

  await mongoose.connect(MONGODB_URI);
};

export default databaseConnection;