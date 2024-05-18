import type { Session, User, Spot } from "$lib/types/spot-types";
import { userStore } from "$lib/models/mongo/user-store";
import { spotStore } from "$lib/models/mongo/spot-store";

export const spotService = {

  async signup(user: User): Promise<boolean> {
    try {
      const newUser = await userStore.addUser(user);
      return !newUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const user = await userStore.getUserByEmail(email);
      if (user !== null && user.password === password) {
        const session = {
          name: `${user.firstName} ${user.lastName}`,
          token: user._id!.toString(),
          _id: user._id!.toString()
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async createSpot(spot: Spot) {
    try {
      spotStore.addSpot(spot);
    } catch (error) {
      return false;
    }
  },

  async editSpot(oldSpot: Spot, newSpot: Spot) {
    try {
      spotStore.editSpot(oldSpot, newSpot);
    } catch (error) {
      return false;
    }
  },

  async deleteSpot(id: string) {
    try {
      await spotStore.deleteSpot(id);
      return null
    } catch (error) {
      return false;
    }
  },

  async getSpots(): Promise<Spot[]> {
    try {
      const spots = await spotStore.getAllSpots();
      return JSON.parse(JSON.stringify(spots));
    } catch (error) {
      return [];
    }
  },

  async getSpotById(id: string | any): Promise<Spot | null> {
    try {
      const spot = await spotStore.getSpotById(id);
      return JSON.parse(JSON.stringify(spot));
    } catch (error) {
      return null;
    }
  },

  async getUsers(): Promise<User[]> {
    try {
      const users = await userStore.getAllUsers();
      return JSON.parse(JSON.stringify(users));
    } catch (error) {
      return [];
    }
  },

  async getAnalytics(): Promise<any[]> {
    try {
      const analytics = await spotStore.getSpotAnalytics;
      return JSON.parse(JSON.stringify(analytics));
    } catch (error) {
      return [];
    }
  },

  async getUserSpotCount(): Promise<Number[]> {
    try {
      const users = await userStore.getAllUsers();
        let userIds: any[] = [];
        if (users) users.forEach((user: User) => {
          if (user._id) userIds.push(user._id);
        });

        let userSpotCount: any[] = [];
        for (const element of userIds) {
            let r = await spotStore.getUserSpots(element);
            if (r) userSpotCount.push(r.length);
        }
      return userSpotCount;
    } catch (error) {
      return [];
    }
  },
};