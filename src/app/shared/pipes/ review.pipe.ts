import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'review',
})
export class ReviewPipe implements PipeTransform {
  public transform(cauntOfReviews: number | undefined): string {
    if (!cauntOfReviews || cauntOfReviews === 0) {
      return 'Нет отзывов';
    }
    if (cauntOfReviews && cauntOfReviews === 1) {
      return `${cauntOfReviews} отзыв`;
    }
    if (cauntOfReviews && cauntOfReviews > 1 && cauntOfReviews < 5) {
      return `${cauntOfReviews} отзывa`;
    }
    if (cauntOfReviews && cauntOfReviews >= 5) {
      return `${cauntOfReviews} отзывов`;
    }
    return `Нет отзывов`;
  }
}
