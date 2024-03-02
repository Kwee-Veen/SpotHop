// TODO: Refactor as required for spot-model-test

// import { assert } from "chai";
// import { db } from "../src/models/db.js";
// import { rock, testPlaylists } from "./fixtures.js";
// import { playlistMongoStore } from "../src/models/mongo/playlist-mongo-store.js";
// import { assertSubset } from "./test-utils.js";
// import { EventEmitter } from "events";

// suite("Playlist Model tests", () => {
//     setup(async () => {
//       EventEmitter.setMaxListeners(25);
//       db.init("mongo");
//       await playlistMongoStore.deleteAllPlaylists();
//       for (let i = 0; i < testPlaylists.length; i += 1) {
//         testPlaylists[i] = await db.playlistStore.addPlaylist(testPlaylists[i]);
//       }
//     });
    
//       test("create a playlist", async () => {
//         const playlist = await db.playlistStore.addPlaylist(rock);
//         assertSubset(rock, playlist);
//         assert.isDefined(playlist._id);
//       });
    
//       test("delete all playlists", async () => {
//         let returnedPlaylists = await db.playlistStore.getAllPlaylists();
//         assert.equal(returnedPlaylists.length, 3);
//         await db.playlistStore.deleteAllPlaylists();
//         returnedPlaylists = await db.playlistStore.getAllPlaylists();
//         assert.equal(returnedPlaylists.length, 0);
//       });
    
//       test("get a playlist - success", async () => {
//         const playlist = await db.playlistStore.addPlaylist(rock);
//         const returnedPlaylist = await db.playlistStore.getPlaylistById(playlist._id);
//         assertSubset(rock, playlist);
//       });
    
//       test("delete One Playist - success", async () => {
//         const id = testPlaylists[0]._id;
//         await db.playlistStore.deletePlaylistById(id);
//         const returnedPlaylists = await db.playlistStore.getAllPlaylists();
//         assert.equal(returnedPlaylists.length, testPlaylists.length - 1);
//         const deletedPlaylist = await db.playlistStore.getPlaylistById(id);
//         assert.isNull(deletedPlaylist);
//       });
    
//       test("get a playlist - bad params", async () => {
//         assert.isNull(await db.playlistStore.getPlaylistById(""));
//         assert.isNull(await db.playlistStore.getPlaylistById());
//       });
    
//       test("delete One Playlist - fail", async () => {
//         await db.playlistStore.deletePlaylistById("bad-id");
//         const allPlaylists = await db.playlistStore.getAllPlaylists();
//         assert.equal(testPlaylists.length, allPlaylists.length);
//       });
// });