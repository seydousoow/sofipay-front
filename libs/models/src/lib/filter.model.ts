export interface IFilterOption<T = string> {
  label: string;
  value: T;
  checked?: boolean;
  intermediary?: boolean;
  disabled?: boolean;
  subOptions?: IFilterOption<T>[];
  opened?: boolean;
  css?: string;
}
