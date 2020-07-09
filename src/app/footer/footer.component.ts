import { environment } from 'src/environments/environment';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-shop-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public author: string = environment.author;
  public currentYear: number = new Date().getFullYear();
}
