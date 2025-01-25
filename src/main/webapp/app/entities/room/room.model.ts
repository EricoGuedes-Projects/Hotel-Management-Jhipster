export interface IRoom {
  id: number;
  roomNumber?: number | null;
  roomType?: string | null;
  pricePerNight?: number | null;
  isAvailable?: boolean | null;
  amenities?: string | null;
}

export type NewRoom = Omit<IRoom, 'id'> & { id: null };
