import type { Gif } from '../interfaces/gif.interface';
import type { GiphyItem } from '../interfaces/giphy.interfaces';

export class GifMapper {
  static mapGiphyItemtoGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url,
    };
  }
  static mapGiphyItemtoGifArray(giphyItem: GiphyItem[]): Gif[] {
    return giphyItem.map(this.mapGiphyItemtoGif);
  }
}
