import { TRole } from './role.model';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  role: TRole;
  active: boolean;
}
