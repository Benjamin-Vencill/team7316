export interface Event {
    title: string;
    content: string;
    likes: number;
    eventLat: number;
    eventLng: number;
    // nonProfitName: string;
    created?: Date;
    id?: string;
  }