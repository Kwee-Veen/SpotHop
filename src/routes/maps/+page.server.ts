import { spotService } from "$lib/services/spot-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ }) => {
  return {
    spots: await spotService.getSpots(),
  };
};
