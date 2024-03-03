import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const spotJsonStore = {
  async getAllSpots() {
    await db.read();
    return db.data.spots;
  },

  async addSpot(spot) {
    await db.read();
    if (!spot._id) {
      spot._id = v4();
    }
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

  async editSpot(originalSpot, updatedSpot) {
    await db.read();
    if (!updatedSpot.name) {
      updatedSpot.name  = originalSpot.name;
    };
    if (!updatedSpot.description) {
      updatedSpot.description  = originalSpot.description;
    };
    if (!updatedSpot.category) {
      updatedSpot.category  = originalSpot.category;
    };
    if (!updatedSpot.latitude) {
      updatedSpot.latitude  = originalSpot.latitude;
    };
    if (!updatedSpot.longitude) {
      updatedSpot.longitude  = originalSpot.longitude;
    }
    console.log("Original ID: " + JSON.stringify(originalSpot._id));
    console.log("Updated ID (shouldn't be defined yet): " + JSON.stringify(updatedSpot._id));
    updatedSpot.userid = originalSpot.userid,
    updatedSpot._id = originalSpot._id,
    console.log("Updated ID: " + JSON.stringify(updatedSpot._id));
    await this.deleteSpot(originalSpot._id);
    await this.addSpot(updatedSpot);
    return updatedSpot
  },

  async deleteSpotsByUserid(userid) {
    await db.read();
    const spots = await this.getUserSpots(userid);
    for (let i = 0; i < spots.length; i++) {
      await this.deleteSpot(spots[i]._id)
    } 
    await db.write();
    return null
  },
};
