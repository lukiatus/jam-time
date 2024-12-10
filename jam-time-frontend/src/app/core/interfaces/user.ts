import { IdNamePair } from './id-name-pair';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  bands: IdNamePair[];
  managedBands: IdNamePair[];
}
