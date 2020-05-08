import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-shop-category-dropdown',
    templateUrl: './category-dropdown.component.html',
  })
  export class CategoryDropdownComponent {
    @Input() public category!: ICategory;
    @Input() public index!: number;
    public currentIndex: number | null = null;
    public isShow = false;

    public hover(index: number) {
      this.currentIndex = index;
      this.isShow = !this.isShow;
    }
  }
