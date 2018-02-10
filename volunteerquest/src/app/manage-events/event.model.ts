export interface Event {
    eventTitle: string;
    eventDescription: string;
    likes: number;
    eventLat: number;
    eventLng: number;
    // nonProfitName: string;
    created?: Date;
    id?: string;
  }