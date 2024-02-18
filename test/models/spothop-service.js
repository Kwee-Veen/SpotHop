import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const spothopService = {
  spothopUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.spothopUrl}/api/users`, user);
    return res.data;
  },
  
  async getUser(id) {
    const res = await axios.get(`${this.spothopUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.spothopUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.spothopUrl}/api/users`);
    return res.data;
  },
}