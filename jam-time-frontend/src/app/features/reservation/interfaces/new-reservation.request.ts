export interface NewReservationRequest {
  from: Date;
  to: Date;
  bandId: number;
  roomId: number;
  remark: string;
}
