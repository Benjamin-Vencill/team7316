export interface Event {
    title: string;
    content: string;
    likes: number;
    lat: number;
    lng: number;
    street: string;
    city: string;
    zipcode: string;
    date?: Date;
    time?: object;
    uid?: string;
    url?: string;
    contact?: string;
    phone?: string;
    email?: string;
  }