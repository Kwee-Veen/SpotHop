import { goto } from "$app/navigation";
import { spotService } from "$lib/services/spot-service";
import type { User } from "$lib/types/spot-types";


export const actions = {
  signup: async ({ request }) => {
    const form = await request.formData();
    let user: User = {
      firstName: form.get('firstName') as string,
      lastName: form.get('lastName') as string,
      email: form.get('email') as string,
      password: form.get('password') as string,
      admin: false,
    };
    const success = await spotService.signup(user);
    if (!success) {
      return;
    }
    else {
      goto('/login');
      return;
    }
  }
}