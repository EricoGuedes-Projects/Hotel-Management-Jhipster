export interface IEmployee {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  position?: string | null;
  salary?: number | null;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
