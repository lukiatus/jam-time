export interface ConcertEvent {
  id: number;
  gateOpeningTime: string;
  description?: string;
  headlinerBand: string;
  supportBands?: string[];
  flyerUrl?: string;
  place: string;
}
