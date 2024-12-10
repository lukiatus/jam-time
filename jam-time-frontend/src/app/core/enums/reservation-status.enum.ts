export enum ReservationStatusEnum {
  Accepted = 1,
  Deleted = 2,
  Rejected = 3
}

export function toLocalString(status: ReservationStatusEnum): string {
  switch (status) {
    case ReservationStatusEnum.Accepted:
      return 'Elfogadott';
    case ReservationStatusEnum.Deleted:
      return 'Törölt';
    case ReservationStatusEnum.Rejected:
      return 'Elutasított';
    default:
      throw new Error('ISMERETLEN');
  }
}

