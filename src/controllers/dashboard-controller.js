import { SpotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const spots = await db.spotStore.getUserSpots(loggedInUser._id);
      const viewData = {
        title: "SpotHop Dashboard",
        user: loggedInUser,
        spots: spots,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addSpot: {
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const spots = await db.spotStore.getUserSpots(loggedInUser._id);
        return h.view("dashboard-view", { title: "Error adding spot", spots: spots, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newSpot = {
        userid: loggedInUser._id,
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.spotStore.addSpot(newSpot);
      return h.redirect("/dashboard");
    },
  },

  deleteSpot: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      await db.spotStore.deleteSpot(spot._id);
      return h.redirect("/dashboard");
    },
  },
};
