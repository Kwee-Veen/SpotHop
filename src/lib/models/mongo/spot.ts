import { Schema, model } from "mongoose";
import type { Spot } from "$lib/types/spot-types";
import pkg from "mongoose";
const { models } = pkg;

const spotSchema = new Schema<Spot>({
    name: String,
    description: String,
    img: [],
    category: String,
    latitude: Number,
    longitude: Number,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
});

export const SpotMongoose = models["Spot"] || model("Spot", spotSchema);

