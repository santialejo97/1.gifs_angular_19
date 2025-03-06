import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

@Component({
  selector: 'app-gifs-history',
  imports: [GifsListComponent],
  templateUrl: './gifs-history.component.html',
})
export default class GifsHistoryComponent {
  gifService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((resp) => resp['query']))
  );

  gifsBykey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
