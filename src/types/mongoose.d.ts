import { Mongoose } from "mongoose";

declare global {
  var isConnected: Promise<Mongoose>;
}
