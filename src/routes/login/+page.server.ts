import { dev } from "$app/environment";
import { userStore } from "$lib/models/mongo/user-store.js";
import { spotService } from "$lib/services/spot-service";
import { redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const userRecord = await userStore.getUserByEmail(email);
    let password = form.get("password") as string;
    if (email === "" || password === "") {
      throw redirect(307, "/");
    } else {
      if (userRecord && password) {
        if (bcrypt.compareSync(password, userRecord.hash)) password = userRecord.password;
      }
      console.log(`attemting to log in email: ${email} with hashed password: ${userRecord?.hash}`);
      let session: any;
      session = await spotService.login(email, password);
      if (session) {
        const userJson = JSON.stringify(session);
        cookies.set("spot-user", userJson, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: !dev,
          maxAge: 60 * 60 * 24 * 7
        });
        throw redirect(303, "/report");
      }

    }
  }
};