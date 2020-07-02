import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IBrand } from 'src/app/content/category/store/reducers/brands.reducer';


@Component({
  selector: 'ngx-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  @Input()
  public categories?: IBrand[];
  public close!: () => void;
  public save!: () => void;
}
