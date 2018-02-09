export interface Event {
    title: string;
    content: string;
    likes: number;
    lat: number;
    lng: number;
    created?: Date;
    id?: string;
  }