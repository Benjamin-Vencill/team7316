export interface Event {
    title: string;
    content: string;
    likes: number;
    lat: number;
    lng: number;
    street: string;
    city: string;
    zipcode: string;
    id?: string;
    category: string;
    created?: Date; 
    date?: Date;
    time?: object;
    time_string?: string;
    date_string?: string;
    uid?: string;
    url?: string;
    contact?: string;
    phone?: string;
    email?: string;
    expanded: false;
    subscribers?: any;
  }