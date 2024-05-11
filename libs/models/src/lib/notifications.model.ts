import { TIconName } from './icon.model';

export type TNotificationHeader =
  | 'EVENT'
  | 'NEWS'
  | 'ALERT';

export interface INotificationHeader {
  id?: number;
  type: TNotificationHeader;
  text: string;
  displayLink: string;
  link: string;
  active: boolean;
}

export interface INotification {
  title: string;
  subTitle?: string;
  timeout?: number;
  icon: TIconName;
  iconColor?: 'green' | 'red' | 'yellow' | 'blue';
}
