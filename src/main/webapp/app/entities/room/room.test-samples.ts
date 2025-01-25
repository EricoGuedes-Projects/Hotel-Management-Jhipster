import { IRoom, NewRoom } from './room.model';

export const sampleWithRequiredData: IRoom = {
  id: 25051,
  roomNumber: 3574,
  roomType: 'monocle',
  pricePerNight: 6441.83,
  isAvailable: false,
};

export const sampleWithPartialData: IRoom = {
  id: 3867,
  roomNumber: 19226,
  roomType: 'ick ditch as',
  pricePerNight: 15781.84,
  isAvailable: true,
  amenities: 'deny phooey twine',
};

export const sampleWithFullData: IRoom = {
  id: 10102,
  roomNumber: 29512,
  roomType: 'gee unnaturally',
  pricePerNight: 31946.54,
  isAvailable: false,
  amenities: 'gaseous',
};

export const sampleWithNewData: NewRoom = {
  roomNumber: 8602,
  roomType: 'without',
  pricePerNight: 25171.74,
  isAvailable: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
