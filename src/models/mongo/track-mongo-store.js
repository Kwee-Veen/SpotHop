// TODO: Use as reference for spot-mongo-store

// import { Track } from "./track.js";

// export const trackMongoStore = {
//   async getTracksByPlaylistId(id) {
//     const tracks = await Track.find({ playlistid: id }).lean();
//     return tracks;
//   },

//   async getAllTracks() {
//     const tracks = await Track.find().lean();
//     return tracks;
//   },

//   async addTrack(playlistId, track) {
//     const newTrack = new Track(track);
//     const trackObj = await newTrack.save();
//     return trackObj;
//   },

//   async getTrackById(id) {
//     let foundTrack = await Track.find({ _id : id }).lean();
//     if (!foundTrack) {
//       foundTrack = null;
//     }
//     return foundTrack;
//   },

//   async getPlaylistTracks(playlistId) {
//     let foundTracks = await Track.find({ playlistid : playlistId });
//     if (!foundTracks) {
//       foundTracks = null;
//     }
//     return foundTracks;
//   },

//   async deleteTrack(id) {
//     try {
//       await Track.deleteOne({ _id: id });
//     } catch (error) {
//       console.log("bad id");
//     }
//   },

//   async deleteAllTracks() {
//     await Track.deleteMany({});
//   },

//   // async updateTrack(track, updatedTrack) {
//   //   getTrackById(track._id);

//   //   // track.title = updatedTrack.title;
//   //   // track.artist = updatedTrack.artist;
//   //   // track.duration = updatedTrack.duration;
//   //   // await db.write();
//   // },
// };