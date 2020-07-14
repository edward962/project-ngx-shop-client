import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'review',
})
export class ReviewPipe implements PipeTransform {
  public transform(countOfReviews: number | undefined): string {
    if (!countOfReviews || countOfReviews === 0) {
      return 'Нет отзывов';
    }
    if (countOfReviews && countOfReviews === 1) {
      return `${countOfReviews} отзыв`;
    }
    if (countOfReviews && countOfReviews > 1 && countOfReviews < 5) {
      return `${countOfReviews} отзывa`;
    }
    if (countOfReviews && countOfReviews >= 5) {
      return `${countOfReviews} отзывов`;
    }
    return `Нет отзывов`;
  }
}
