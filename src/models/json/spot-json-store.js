import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const spotJsonStore = {
  async getAllSpots() {
    await db.read();
    return db.data.spots;
  },

  async addSpot(spot) {
    await db.read();
    spot._id = v4();
    db.data.spots.push(spot);
    await db.write();
    return spot;
  },

  async getUserSpots(userid) {
    await db.read();
    let foundSpots = db.data.spots.filter((spot) => spot.userid === userid);
    if (!foundSpots) {
      foundSpots = null;
    }
    return foundSpots;
  },

  async getSpotById(id) {
    await db.read();
    let foundSpot = db.data.spots.find((spot) => spot._id === id);
    if (!foundSpot) {
      foundSpot = null;
    }
    return foundSpot;
  },

  async getSpotsByCategory(inputSpot) {
    await db.read();
    let foundSpots = db.data.spots.filter((spot) => spot.category === inputSpot.category);
    if (!foundSpots) {
      foundSpots = null;
    }
    return foundSpots;
  },

  async getSpotsByLocation(inputSpot) {
    await db.read();
    let foundSpots = db.data.spots.filter((spot) => spot.latitude === inputSpot.latitude && spot.longitude === inputSpot.longitude);
    if (!foundSpots) {
      foundSpots = null;
    }
    return foundSpots;
  },

  async deleteSpot(id) {
    await db.read();
    const index = db.data.spots.findIndex((spot) => spot._id === id);
    if (index !== -1) db.data.spots.splice(index, 1);
    await db.write();
    return null
  },

  async deleteAllSpots() {
    db.data.spots = [];
    await db.write();
  },

//   async updateSpot(spot, updatedSpot) {
//     spot.title = updatedSpot.title;
//     spot.artist = updatedSpot.artist;
//     spot.duration = updatedSpot.duration;
//   },
};
