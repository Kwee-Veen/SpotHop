import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const spotApi = {
    find: {
        auth: false,
        handler: async function (request, h) {
          try {
            const spots = await db.spotStore.getAllSpots();
            return spots;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
      },
    
      create: {
        auth: false,
        handler: async function (request, h) {
          try {
            const spot = request.payload;
            const newSpot = await db.spotStore.addSpot(spot);
            if (newSpot) {
              return h.response(newSpot).code(201);
            }
            return Boom.badImplementation("error creating spot");
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
      },

      deleteOne: {
        auth: false,
        handler: async function (request, h) {
          try {
            const spot = await db.spotStore.getSpotById(request.params.id);
            if (!spot) {
              return Boom.notFound("No Spot with this id");
            }
            await db.spotStore.deleteSpot(spot._id);
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("No Spot with this id");
          }
        },
      },
    
      findOne: {
        auth: false,
        async handler(request) {
          try {
            const spot = await db.spotStore.getSpotById(request.params.id);
            if (!spot) {
              return Boom.notFound("No Spot with this id");
            }
            return spot;
          } catch (err) {
            return Boom.serverUnavailable("No Spot with this id");
          }
        },
      },
    
      deleteAll: {
        auth: false,
        handler: async function (request, h) {
          try {
            await db.spotStore.deleteAllSpots();
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
      },
};