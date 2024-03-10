import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
    name: String,
    description: String,
    category: String,
    latitude: Number,
    longitude: Number,
});

export const Spot = Mongoose.model("Spot", spotSchema);