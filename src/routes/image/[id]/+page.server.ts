import { spotService } from "$lib/services/spot-service";
import type { Spot } from "$lib/types/spot-types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { spotStore } from "$lib/models/mongo/spot-store.js";
import { cloudinary_name } from "$env/static/private";
import { cloudinary_preset } from "$env/static/private";
import { cloudinary_key } from "$env/static/private";
import { cloudinary_secret } from "$env/static/private";
import { v2 as cloudinary } from "cloudinary";


export const ssr = false;
let id: string;
let spot: Spot | null;
let index: number;

const credentials = {
  cloud_name: cloudinary_name,
  api_key: cloudinary_key,
  api_secret: cloudinary_secret,
};
cloudinary.config(credentials);

export const load: PageServerLoad = async ({ cookies, params }) => {
  const cookieStr = cookies.get("spot-user") as string;
  if (cookieStr) {
    id = encodeURI(params.id);
    spot = await spotService.getSpotById(id);
    return {
      spot: spot,
      cloudinary_name: cloudinary_name,
      cloudinary_preset: cloudinary_preset,
      cloudinary_key: cloudinary_key,
      cloudinary_secret: cloudinary_secret,
    }
  }
};


export const actions = {
  uploadImage: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const form = await request.formData();
      const originalSpot = await spotStore.getSpotById(id);
      let newSpot: Spot;

      if (originalSpot) {
        newSpot = originalSpot;
        let imageURL = form.get('returnedURL') as string;
        if (imageURL && newSpot.img) newSpot.img.unshift(imageURL); else console.log("No image URL found");
        if (originalSpot && imageURL) spotService.editSpot(originalSpot, newSpot); else console.log("Spot not updated with the new image's URL");
      }
      redirect(301, "/report");
    }
  },

  deleteImage: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const form = await request.formData();
      const deleteImageURL = form.get('deleteImageId') as string;
      const deleteImageId = deleteImageURL.substring(62, 82);
      await cloudinary.uploader.destroy(deleteImageId as string).then(result => console.log("Result of deletion of image " + deleteImageId + " from Cloudinary: " + JSON.stringify(result)));

      let newSpot: Spot;
      if (spot) {
        newSpot = spot;
        if (newSpot.img) {
          index = newSpot.img.indexOf(deleteImageURL);
          newSpot.img.splice(index, 1);
          console.log("Deleted image " + deleteImageId + " from spot: " + newSpot.name);
        }
        else console.log("Image " + deleteImageId + " not deleted from spot: " + newSpot.name);

        spotService.editSpot(spot, newSpot);
      }
      redirect(301, "/report");
    }
  }
};