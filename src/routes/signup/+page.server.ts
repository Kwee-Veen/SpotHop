import { spotService } from "$lib/services/spot-service";
import type { User } from "$lib/types/spot-types";
import { redirect } from "@sveltejs/kit";
import validator from 'validator';

export const actions = {
  signup: async ({ request }) => {
    const form = await request.formData();
    let firstName = form.get('firstName') as string;
    let lastName = form.get('lastName') as string;
    let email = form.get('email') as string;
    let password = form.get('password') as string;
    let user: User | any = { admin: false }
    // Input validation section - Start //
    let errorFlag = false;
    if (validator.isAlpha(firstName)) user.firstName = firstName; else {
      console.log(firstName + " has invalid characters. User not created.");
      errorFlag = true;
    }
    if (validator.isAlpha(lastName)) user.lastName = lastName; else {
      console.log(lastName + " has invalid characters. User not created.");
      errorFlag = true;
    }
        // Email sanitisation section - Start //
        // Note: the RegExp ^[\p{L}\p{Zs}]+$ means the string can only contain unicode letters or spaces.
        // Source: https://stackoverflow.com/questions/29817993/regex-for-validating-and-sanitizing-all-english-and-non-english-unicode-alphabet
    const nonBlacklistCharsEmail = validator.blacklist(email, `^[\p{L}\p{Zs}]+$`);
    if (nonBlacklistCharsEmail) email = nonBlacklistCharsEmail; else errorFlag = true; console.log("Error while performing email character blacklisting");
    const escapedCharsEmail = validator.escape(email);
    if (escapedCharsEmail) email = escapedCharsEmail; else errorFlag = true; console.log("Error while performing email character escaping");
    const normalizedEmail = validator.normalizeEmail(email);
    if (normalizedEmail) email = normalizedEmail; else errorFlag = true; console.log("Error while performing email character normalisation");
        // Email sanitisation section - End //

    if (validator.isEmail(email)) user.email = email; else {
      console.log(email + " is invalid, user not created.");
      errorFlag = true;
    }
    if (validator.isStrongPassword(password)) user.password = password; else {
      console.log(password + " is not a valid strong password. User not created.");
      errorFlag = true;
    }
    // Input validation section - End //
    
    if (!errorFlag) {
      const success = await spotService.signup(user);
      if (!success) {
        console.log("Did not create new user because reasons");
        return;
      }
      else {
        console.log("Successfully created new user " + firstName + " " + lastName + ", " + email + ", password: " + password);
        redirect(301, '/login');
      }
    }
    else console.log("Did not create new user because reasons"); return;
  }
}