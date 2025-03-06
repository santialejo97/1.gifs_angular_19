import { Component, input } from '@angular/core';
import type { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
})
export class GifsListItemComponent {
  gifsItem = input.required<string>();
}
