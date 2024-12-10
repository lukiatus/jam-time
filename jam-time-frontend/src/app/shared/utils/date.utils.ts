import dayjs from 'dayjs';

export class DateUtils {
  public static getDatePart(date: Date): string {
    return dayjs(date).format('YYYY.MM.DD');
  }

  public static getTimePart(date: Date): string {
    return dayjs(date).format('HH:mm');
  }
}
