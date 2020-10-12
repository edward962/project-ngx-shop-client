import { Pipe, PipeTransform } from '@angular/core';
import { IProductImage } from '@product-store/reducers/product.reducer';
@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  public transform(images: IProductImage[] | undefined): string {
    if (!images) {
      return '';
    }
    const [currentImg] = images;
    if (!currentImg) {
      return '';
    }

    return `${currentImg.url}`;
  }
}
