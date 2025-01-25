import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 8899,
  firstName: 'Heloísa',
  lastName: 'Melo',
  email: 'Silvia.Silva76@yahoo.com',
  position: 'yippee aw disclosure',
};

export const sampleWithPartialData: IEmployee = {
  id: 5984,
  firstName: 'Carla',
  lastName: 'Moraes',
  email: 'Theo_Melo74@yahoo.com',
  position: 'circumnavigate',
  salary: 6733.69,
};

export const sampleWithFullData: IEmployee = {
  id: 19019,
  firstName: 'Ofélia',
  lastName: 'Moreira',
  email: 'Maite_Albuquerque47@live.com',
  position: 'boo cauliflower',
  salary: 21306.43,
};

export const sampleWithNewData: NewEmployee = {
  firstName: 'Cauã',
  lastName: 'Pereira',
  email: 'Janaina_Oliveira@gmail.com',
  position: 'spectate insist suckle',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
