import { ReservationStatusEnum } from '../../../core/enums/reservation-status.enum';

export interface SearchReservationRequest {
  from?: Date;
  to?: Date;
  status?: ReservationStatusEnum;
  searchText?: string;
}
