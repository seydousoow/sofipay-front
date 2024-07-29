import { TRole } from './role.model';

export interface IUser {
  id: string;
  email?: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  role: TRole;
  active: boolean;
}
