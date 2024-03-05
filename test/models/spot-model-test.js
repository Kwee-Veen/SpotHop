import { assert } from "chai";
import { db } from "../../src/models/db.js"
import { testSpot, spotsGroup, maggie } from "../fixtures.js";
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
        let returnedSpots = await db.spotStore.getSpotsByCategory(spotsGroup[1].category);
        assert.equal(returnedSpots.length, 2);
    });

    test("get a spot - no params", async () => {
        let nullInputSpot = {}
        let nullSpot = await db.spotStore.getSpotById(nullInputSpot);
        assert.isNull(nullSpot);
        nullSpot = await db.spotStore.getSpotsByCategory(nullInputSpot);
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
    });

    test("edit a spot - success", async () => {
        const returnedSpots = await db.spotStore.editSpot(spotsGroup[0], testSpot);
        assert.deepEqual(returnedSpots, testSpot);
        await db.spotStore.deleteAllSpots();
    });

    test("search for spots - success", async () => {
        let returnedSpots = await db.spotStore.searchSpots(null, testSpot.name, testSpot.category, testSpot.latitude, testSpot.longitude);
        assert.deepEqual(returnedSpots, []);
        const newSpot = await db.spotStore.addSpot(testSpot);
        returnedSpots = await db.spotStore.searchSpots(null, testSpot.name, testSpot.category, testSpot.latitude, testSpot.longitude);
        assertSubset(returnedSpots, testSpot);
    });

    test("search for spots - failure", async () => {
        const returnedSpots = await db.spotStore.searchSpots("bad params", "bad params", "bad params", "bad params", "bad params");
        assert.deepEqual(returnedSpots, []);
        await db.spotStore.deleteAllSpots();
    });

    test("spot analytics - success", async () => {
        let returnedSpots = await db.spotStore.getSpotAnalytics(maggie);
        let test = {}; 
        test.Locale = 2;
        test.Activity = 0;
        test.Scenery = 0;
        test.Site = 0;
        test.Structure = 1;
        test.Shopping = 0;
        test.User = 1;
        test.Global = 3;
        assert.deepEqual(returnedSpots, test);
        await db.spotStore.addSpot(testSpot);
        await db.spotStore.deleteAllSpots();
        returnedSpots = await db.spotStore.getSpotAnalytics(maggie);
        test.Locale = 0;
        test.Structure = 0;
        test.User = 0;
        test.Global = 0;
        assert.deepEqual(returnedSpots, test);
        await db.spotStore.deleteAllSpots();
    });
});