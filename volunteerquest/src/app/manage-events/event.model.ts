export interface Event {
    title: string;
    content: string;
    likes: number;
    lat: number;
    lng: number;
    street: string;
    city: string;
    zipcode: string;
    URL?: string;
    date?: Date;
    // nonProfitName: string;
    created?: Date;
    id?: string;
  }