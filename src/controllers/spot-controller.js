import { SpotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const spotController = {
  index: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      const viewData = {
        title: "Edit Spot",
        spot: spot,
      };
      console.log("Editing spot ", spot.name);
      return h.view("spot-view", viewData);
    },
  },

// TODO: implement editSpot, uncomment web-routes route for this function, test.

//   editSpot: {
//     validate: {
//       payload: SpotSpec,
//       options: { abortEarly: false },
//       failAction: async function (request, h, error) {
//         const loggedInUser = request.auth.credentials;
//         const spots = await db.spotStore.getUserSpots(loggedInUser._id);
//         return h.view("dashboard-view", { title: "Error editing spot", spots:spots, errors: error.details }).takeover().code(400);
//       },
//     },
//     handler: async function (request, h) {
//       const loggedInUser = request.auth.credentials;
//       const newSpot = {
//         userid: loggedInUser._id,
//         name: request.payload.name,
//         category: request.payload.category,
//         description: request.payload.description,
//       };
//       await db.spotStore.addSpot(newSpot);
//       return h.redirect("/dashboard");
//     },
//   },

};
