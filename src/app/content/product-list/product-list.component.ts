import { Component, Input} from '@angular/core';
import { ICategory } from 'src/app/interfaces/category.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent {
  public show: string;
  public currentIndex: number | null = null;
  @Input() public categories!: ICategory[];
  inputForm = new FormControl('');
  hover(index: number) {
    this.currentIndex = index;
  }
}
