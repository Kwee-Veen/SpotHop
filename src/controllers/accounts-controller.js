import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to SpotHop" });
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for SpotHop" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/login");
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to SpotHop" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

  accountDetailsIndex: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      const viewData = {
        title: "Edit Account Details",
        user: loggedInUser,
      };
      console.log('Access account details of user', loggedInUser.email);
      return h.view("account-view", viewData);
    },
  },

  modifyAccount: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        console.log("Account details modification error")
        const loggedInUser = request.auth.credentials;
        console.log("Logged in user: ", loggedInUser)
        const viewData = {
          user: loggedInUser,
          title: "Account details modification error", 
          errors: error.details,
        };
        return h.view("account-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const oldUserData = request.auth.credentials;
      const updatedUserData = request.payload;
      await db.userStore.updateUser(oldUserData, updatedUserData);
      return h.redirect("/accountDetailsIndex");
    },
  },
};