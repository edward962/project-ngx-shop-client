import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-shop-category-item',
    templateUrl: './category-item.component.html',
  })
  export class CategoryItemComponent {
    @Input() public category!: ICategory;
    @Input() public index!: number;
    public currentIndex: number | null = null;
    public isShow: boolean = false;



    public hover(index: number) {
      this.currentIndex = index;
      this.isShow = !this.isShow;
    }
  }