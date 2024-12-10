import { Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  imports: [],
  templateUrl: './filter-button.component.html',
  standalone: true,
  styleUrl: './filter-button.component.scss'
})
export class FilterButtonComponent {
  public placeholder = input<string>('');
  public clear = output();
  public keyup = output<Event>();
  private textInput = viewChild.required<ElementRef>('textInput');

  public clearFilter(): void {
    this.textInput().nativeElement.value = '';
    this.clear.emit();
  }
}
