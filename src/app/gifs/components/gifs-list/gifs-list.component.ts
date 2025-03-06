import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifsListItemComponent } from './gifs-list-item/gifs-list-item.component';
import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsListComponent {
  gifsList = input.required<Gif[]>();
}
