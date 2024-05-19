import { spotService } from "$lib/services/spot-service";
import type { Session, Spot } from "$lib/types/spot-types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import validator from 'validator';

export const ssr = false;

export const load: PageServerLoad = async ({ }) => {
  return {
    spots: await spotService.getSpots(),
  };
};

export const actions = {

  create: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const session = JSON.parse(cookieStr) as Session;
      if (session) {
        const form = await request.formData();
        const spot: Spot | any = {
          name: '' as string,
          category: form.get("category") as string,
          latitude: form.get("latitude") as unknown as number,
          longitude: form.get("longitude") as unknown as number,
          description: '' as string,
          userid: session._id
        };
        let name = form.get("name") as unknown as string;
        let description = form.get("description") as unknown as string;
        let errorFlag = false;
        if (validator.isAlphanumeric(name, 'en-US', { ignore: ' '} )) spot.name = name; else {
          console.log("Name " + name + " has invalid characters. Spot not created.");
          errorFlag = true;
        }
        if (validator.isAlphanumeric(description, 'en-US', { ignore: ' '} )) spot.description = description; else {
          console.log("Description " + description + " has invalid characters. Spot not created.");
          errorFlag = true;
        }
        if (!errorFlag) {
          spotService.createSpot(spot);
        }
        else console.log("Did not create new spot because reasons");
      }
    }
  },
  delete: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const form = await request.formData();
      const id = form.get("deleteSpotId") as string;
      await spotService.deleteSpot(id);
      console.log("Deleted spot: " + id);
    }
  },

  edit: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const form = await request.formData();
      const id = form.get("editSpotId") as string;
      console.log("Editing spot: " + id);
      redirect(301, "/edit/" + id);
    }
    return
  },

  image: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const form = await request.formData();
      const id = form.get("spotImageId") as string;
      const spot = await spotService.getSpotById(id);
      console.log("Editing images of spot: " + spot?.name);
      redirect(301, "/image/" + id);
    }
    return
  },
};