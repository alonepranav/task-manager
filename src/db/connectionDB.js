import { MONGO_CONNECTION_STRING } from "@/Constants"
import mongoose from "mongoose"

export default async function ConnectDB() {
      try {
            await mongoose.connect(MONGO_CONNECTION_STRING)

            if (mongoose.connection) {
                  console.log("Connected Successfully");
                  // console.log(mongoose)
            }
            else
                  throw new Error("Error")

      } catch (error) {
            console.log(error);
      }
}