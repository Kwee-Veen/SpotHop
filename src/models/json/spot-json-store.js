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

  async getSpotsByCategory(category) {
    await db.read();
    let foundSpots = db.data.spots.filter((spot) => spot.category === category);
    if (!foundSpots) {
      foundSpots = null;
    }
    return foundSpots;
  },

  async getSpotAnalytics(user) {
    await db.read();
    let results = {}; 
    results.Locale = 0;
    results.Activity = 0;
    results.Scenery = 0;
    results.Site = 0;
    results.Structure = 0;
    results.Shopping = 0;
    results.User = 0;
    results.Global = 0;
    let r = null;
    const categories = ['Locale', 'Activity', 'Scenery', 'Site', 'Structure', 'Shopping'];
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      r = await this.getSpotsByCategory(category);
      results[category] = r.length;
    }
    r = await this.getUserSpots(user._id);
    results.User = r.length;
    r = await this.getAllSpots();
    results.Global = r.length;
    return results;
  },

  async searchSpots(userid, name, category, latitude, longitude) {
    await db.read();
    let foundSpots = null;
    if (userid) {
      foundSpots = await this.getUserSpots(userid);
    } else {
      foundSpots = await this.getAllSpots();
    }
    if (foundSpots === null) {
      console.log("No spots found");
      return foundSpots;
    }
    if (name) {
      foundSpots = foundSpots.filter((spot) => spot.name === name);
    }
    if (latitude, longitude) {
      foundSpots = foundSpots.filter((spot) => spot.latitude === Number(latitude));
      foundSpots = foundSpots.filter((spot) => spot.longitude === Number(longitude));
    }
    if (category) {
      foundSpots = foundSpots.filter((spot) => spot.category === category);
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
    updatedSpot.userid = originalSpot.userid,
    updatedSpot._id = originalSpot._id,
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
