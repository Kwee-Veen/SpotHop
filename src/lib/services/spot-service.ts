import axios from "axios";
import type { Session, User, Spot } from "$lib/types/spot-types";

export const spotService = {
  baseUrl: "http://Serenity:4000",

  async signup(user: User) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", user);
      return true;
    } catch (error) {
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data.id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async createSpot(spot: Spot, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/spots", spot);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async getSpots(session: Session): Promise<Spot[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/spots");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getUsers(session: Session): Promise<User[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getAnalytics(session: Session): Promise<any[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/spots/analytics/");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getUserSpotCount(session: Session): Promise<Number[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/users/spotCount/");
      return response.data;
    } catch (error) {
      return [];
    }
  },
};