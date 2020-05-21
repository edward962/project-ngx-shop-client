import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/store/reducers/categories.reducer';

@Component({
  selector: 'ngx-shop-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass'],
})
export class SideMenuComponent {
  @Input()
  public categories: ICategory[] = [];
  public currentIndex: number | null = null;
  
  public hover(index: number) {
    this.currentIndex = index;
  }
}
