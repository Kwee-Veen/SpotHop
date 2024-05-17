import { spotService } from "$lib/services/spot-service";
import type { Spot } from "$lib/types/spot-types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { spotStore } from "$lib/models/mongo/spot-store.js";
import { cloudinary_name } from "$env/static/private";
import { cloudinary_preset } from "$env/static/private";

export const ssr = false;
let id: string;

export const load: PageServerLoad = async ({ cookies, params }) => {
  const cookieStr = cookies.get("spot-user") as string;
  if (cookieStr) {
    id = encodeURI(params.id);
    const spot = await spotService.getSpotById(id);
    return { 
      spot: spot,
      cloudinary_name: cloudinary_name,
      cloudinary_preset: cloudinary_preset 
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
        if (imageURL) newSpot.img = imageURL; else console.log("No image URL found");
        if (originalSpot && imageURL) spotService.editSpot(originalSpot, newSpot); else console.log("Spot not updated with the new image's URL");
      }
      redirect(301, "/report");
    }
  }
};