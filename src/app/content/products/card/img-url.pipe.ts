import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/store/reducers/cart.reducer';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  public transform(images: IProduct['images']): string {
    if (!images) {
      return '';
    }
    const currentImg = images[0];
    if (!currentImg) {
      return '';
    }
    return `${currentImg.url}`;
  }
}
