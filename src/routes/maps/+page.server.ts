import { spotService } from "$lib/services/spot-service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      spots: await spotService.getSpots(session!),
    };
  }
};
