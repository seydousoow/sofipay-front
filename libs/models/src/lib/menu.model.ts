import { TIconName } from './icon.model';

export interface IMenuItem {
  label: string;
  path: string[];
  icon: TIconName;
  subItems?: IMenuItem[];
  hasAccess?: boolean;
}