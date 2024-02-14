// TODO: Refactor as required for spot-model-test

// import { assert } from "chai";
// import { db } from "../src/models/db.js";
// import { bohemianRhapsody, testTracks } from "./fixtures.js";
// import { trackMongoStore } from "../src/models/mongo/track-mongo-store.js";
// import { assertSubset } from "./test-utils.js";
// import { EventEmitter } from "events";

// suite("Track Model tests", () => {
//     setup(async () => {
//       EventEmitter.setMaxListeners(25);
//       db.init("mongo");
//       await trackMongoStore.deleteAllTracks();
//       for (let i = 0; i < testTracks.length; i += 1) {
//         testTracks[i] = await db.trackStore.addTrack(testTracks[i]);
//       }
//     });
    
//       test("create a track", async () => {
//         const track = await db.trackStore.addTrack(bohemianRhapsody);
//         assertSubset(bohemianRhapsody, track);
//         assert.isDefined(track._id);
//       });
    
//       test("delete all tracks", async () => {
//         let returnedTracks = await db.trackStore.getAllTracks();
//         assert.equal(returnedTracks.length, 3);
//         await db.trackStore.deleteAllTracks();
//         returnedTracks = await db.trackStore.getAllTracks();
//         assert.equal(returnedTracks.length, 0);
//       });
    
//       test("get a track - success", async () => {
//         const track = await db.trackStore.addTrack(bohemianRhapsody);
//         const returnedTrack = await db.trackStore.getTrackById(track._id);
//         assertSubset(bohemianRhapsody, returnedTrack);
//       });
    
//       test("delete One Track - success", async () => {
//         const id = testTracks[0]._id;
//         await db.trackStore.deleteTrack(id);
//         const returnedTracks = await db.trackStore.getAllTracks();
//         assert.equal(returnedTracks.length, testTracks.length - 1);
//         const deletedTrack = await db.trackStore.getTrackById(id);
//         // FIXME: produces [], not null
//         assert.isNull(deletedTrack);
//       });
    
//       test("get a track - bad params", async () => {
//         // FIXME: CastError: Cast to ObjectId failed for value "" (type string) at path "_id" for model "Track"
//         let nullTrack = await db.trackStore.getTrackById("");
//         assert.isNull(nullTrack);
//         // assert.isNull(await db.trackStore.getTrackById());
//       });
    
//       test("delete One Track - fail", async () => {
//         await db.trackStore.deleteTrack("bad-id");
//         const allTracks = await db.trackStore.getAllTracks();
//         assert.equal(testTracks.length, allTracks.length);
//       });
// });