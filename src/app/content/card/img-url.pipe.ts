import { IProduct } from './../../interfaces/product.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(images: IProduct['images']): string {
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
