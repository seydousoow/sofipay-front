export type TRole =
  'CUSTOMER_ADMIN'
  | 'CUSTOMER'
  | 'TECHNICAL_ADMIN'
  | 'BUSINESS_ADMIN'
  | 'ACCOUNT_MANAGER';

type TCustomerFilePermission = 'READ_CUSTOMER_FILE';

type TMerchPermission = 'READ_MERCH';

type TCalendarPermission = 'READ_CALENDAR';

type TSellsPermission = 'READ_SELL_IN' | 'READ_SELLOUT' | 'CREATE_SELLOUT' | 'UPDATE_SELLOUT';

type TBillingPermission = 'READ_BILLING';

type TPlanoPermission = 'READ_PLANO';

type TDocumentPermission = 'READ_DOCUMENT' | 'CREATE_DOCUMENT' | 'DELETE_DOCUMENT';

type TRequestPermission =
  'READ_REQUEST'
  | 'CREATE_REQUEST'
  | 'CANCEL_REQUEST'
  | 'ACCEPT_REQUEST'
  | 'DECLINE_REQUEST';

type TUsersPermission = 'CREATE_USERS' | 'READ_USERS' | 'UPDATE_USERS' | 'DELETE_USERS';

export type TPermissions =
  TMerchPermission
  | TSellsPermission
  | TCalendarPermission
  | TCustomerFilePermission
  | TUsersPermission
  | TRequestPermission
  | TDocumentPermission
  | TPlanoPermission
  | TBillingPermission;
