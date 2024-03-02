import { v4 } from "uuid";

let spots = [];

export const spotMemStore = {
  async getAllSpots() {
    return spots;
  },

  async addSpot(spot) {
    spot._id = v4();
    spots.push(spot);
    return spot;
  },

  async getSpotById(id) {
    let foundSpot = spots.find((spot) => spot._id === id);
    if (!foundSpot) {
      foundSpot = null;
    }
    return foundSpot;
  },

  // changed from getPlaylistTracks; now using userid instead of playlistid
  async getUserSpots(userid) {
    let foundSpots = spots.filter((spot) => spot.userid === userid);
    if (!foundSpots) {
      foundSpots = null;
    }
    return foundSpots;
  },

  async deleteSpot(id) {
    const index = spots.findIndex((spot) => spot._id === id);
    if (index !== -1) spots.splice(index, 1);
  },
  
  async deleteAllSpots() {
    spots = [];
  },

//   async updateSpot(spot, updatedSpot) {
//     spot.title = updatedSpot.title;
//     spot.artist = updatedSpot.artist;
//     spot.duration = updatedSpot.duration;
//   },
};
