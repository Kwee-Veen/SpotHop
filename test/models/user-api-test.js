import { assert } from "chai";
import { spothopService } from "./spothop-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";

suite("User API tests", () => {
  setup(async () => {
    await spothopService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      testUsers[i] = await spothopService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await spothopService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await spothopService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await spothopService.deleteAllUsers();
    returnedUsers = await spothopService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await spothopService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  // Will fail if running the db in mem mode; will return a 404 instead of a 503 status code.
  test("get a user - fail", async () => {
    try{
      const returnedUser = await spothopService.getUser("1234");
      assert.fail("Should not return a response"); 
    } catch (error) {
      assert(error.response.data.message === "No User with this id"); 
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await spothopService.deleteAllUsers();
    try {
      const returnedUser = await spothopService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});