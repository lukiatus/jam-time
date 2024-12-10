export interface Reservation {
  id: number;
  bandName: string;
  from: Date;
  to: Date;
  roomName: string;
  remark: string;
  statusName: string;
}
