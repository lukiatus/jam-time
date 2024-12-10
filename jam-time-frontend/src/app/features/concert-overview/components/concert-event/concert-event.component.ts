import { Component, input, output } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle, MatCardTitleGroup, MatCardXlImage
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ConcertEvent } from './concert-event';
import { DatePipe, NgIf } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-concert-event',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardXlImage,
    MatIcon,
    DatePipe,
    MatCardTitleGroup,
    MatDivider,
    NgIf
  ],
  templateUrl: './concert-event.component.html',
  styleUrl: './concert-event.component.scss'
})
export class ConcertEventComponent {
  public concertData = input.required<ConcertEvent>();
  public editable = input<boolean>(false);
  public onDelete = output<number>();
}
