import { Musician } from './musician';

export interface Band {
  id: number;
  name: string;
  leader: Musician;
  members: Musician[];
}
