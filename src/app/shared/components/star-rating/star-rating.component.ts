import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ngx-shop-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.sass'],
})
export class StarRatingComponent {
  @Input() public feedbackRate!: number;
  public coloredStar = '';
  public stars = [0, 1, 2, 3, 4];
  public highlight(index: number) {
    if (
      Math.trunc(this.feedbackRate) !== this.feedbackRate &&
      index + 1 > this.feedbackRate &&
      index <= this.feedbackRate
    ) {
      this.coloredStar = 'star_half';
    } else if (index < this.feedbackRate) {
      this.coloredStar = 'star';
    } else {
      this.coloredStar = 'star_border';
    }
    return index < this.feedbackRate;
  }
}
