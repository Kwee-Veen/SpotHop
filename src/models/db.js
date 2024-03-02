import { userMemStore } from "./mem/user-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { spotJsonStore } from "./json/spot-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
// import { spotMongoStore } from "./mongo/spot-mongo-store.js";

export const db = {
  userStore: null,
  spotStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.spotStore = spotJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        // this.spotStore = spotMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.spotStore = spotMemStore;
    }
  },
};