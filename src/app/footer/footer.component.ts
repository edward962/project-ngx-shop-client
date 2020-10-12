import { Component, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '@env/environment';
@Component({
  selector: 'ngx-shop-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public author: string = environment.author;
  public currentYear: number = new Date().getFullYear();
}
