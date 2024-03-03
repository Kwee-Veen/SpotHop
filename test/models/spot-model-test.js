import { assert } from "chai";
import { db } from "../../src/models/db.js"
import { testSpot, spotsGroup } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";
import { EventEmitter } from "events";

suite("Spot Model tests", () => {

    setup(async () => {
        EventEmitter.setMaxListeners(25);
        db.init("json");
        await db.spotStore.deleteAllSpots();
        for (let i = 0; i < spotsGroup.length; i += 1) {
        spotsGroup[i] = await db.spotStore.addSpot(spotsGroup[i]);
        }
    });

    test("create a spot", async () => {
        const newSpot = await db.spotStore.addSpot(testSpot);
        assertSubset(newSpot, testSpot);
    });

    test("delete all spots", async () => {
        let returnedSpots = await db.spotStore.getAllSpots();
        assert.equal(returnedSpots.length, 3);
        await db.spotStore.deleteAllSpots();
        returnedSpots = await db.spotStore.getAllSpots();
        assert.equal(returnedSpots.length, 0);
    });

    test("get a spot - success", async () => {
        const inputSpot = await db.spotStore.addSpot(testSpot);
        const returnedSpot1 = await db.spotStore.getSpotById(inputSpot._id);
        assert.deepEqual(inputSpot, returnedSpot1);
    });

    test("get spots by category, location - success", async () => {
        let returnedSpots = await db.spotStore.getSpotsByCategory(spotsGroup[1]);
        assert.equal(returnedSpots.length, 2);
        returnedSpots = await db.spotStore.getSpotsByLocation(spotsGroup[0]);
        assert.equal(returnedSpots.length, 1);
    });

    test("get a spot - no params", async () => {
        let nullInputSpot = {}
        let nullSpot = await db.spotStore.getSpotById(nullInputSpot);
        assert.isNull(nullSpot);
        nullSpot = await db.spotStore.getSpotsByCategory(nullInputSpot);
        assert.deepEqual(nullSpot, []);
        nullSpot = await db.spotStore.getSpotsByLocation(nullInputSpot);
        assert.deepEqual(nullSpot, []);
    });
    
    test("delete One Spot - success", async () => {
        await db.spotStore.deleteSpot(spotsGroup[0]._id);
        const returnedSpots = await db.spotStore.getAllSpots();
        assert.equal(returnedSpots.length, spotsGroup.length - 1);
        const deletedSpot = await db.spotStore.deleteSpot(spotsGroup[0]._id);
        assert.isNull(deletedSpot);
    });

    test("delete One Spot - fail", async () => {
        await db.spotStore.deleteSpot("bad-id");
        const allSpots = await db.spotStore.getAllSpots();
        assert.equal(spotsGroup.length, allSpots.length);
        await db.spotStore.deleteAllSpots();
    });

    test("edit a spot - success", async () => {
        const returnedSpots = await db.spotStore.editSpot(spotsGroup[0], testSpot);
        assert.deepEqual(returnedSpots, testSpot);
        await db.spotStore.deleteAllSpots();
    });

});