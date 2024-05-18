export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
    admin: boolean;
  }

  export interface Spot {
    name: string;
    description?: string;
    img?: string[];
    category?: string;
    latitude: number;
    longitude: number;
    _id?: string;
    userid?: User | string;
  };