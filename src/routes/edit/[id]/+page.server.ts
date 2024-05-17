import { spotService } from "$lib/services/spot-service";
import type { Session } from "$lib/types/spot-types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const cookieStr = cookies.get("spot-user") as string;
  if (cookieStr) {
    const id = encodeURI(params.id);
    const spot = await spotService.getSpotById(id);
    return { spot: spot }
  }
};

export const actions = {
  edit: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const session = JSON.parse(cookieStr) as Session;
      const form = await request.formData();
      const id = form.get("editSpotId") as string;
      const oldSpot = await spotService.getSpotById(id);
      const newspot = {
        name: form.get("name") as unknown as string,
        category: form.get("category") as string,
        latitude: form.get("latitude") as unknown as number,
        longitude: form.get("longitude") as unknown as number,
        description: form.get("description") as unknown as string,
        userid: session._id,
      };
      if (oldSpot !== null) spotService.editSpot(oldSpot, newspot);
      redirect(301, "/report");
    }
    return
  },
};