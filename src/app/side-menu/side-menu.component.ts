import { Component } from '@angular/core';
import { ICategory } from './interfaces/category.interface';
import { categories } from '../data/mock-data';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass'],
})
export class SideMenuComponent {
  public show: string;
  public currentIndex: number| null = null;
  public categories: ICategory[] = categories;
  hover(index: number) {
    this.currentIndex = index;
  }
  unHover() {
  this.currentIndex = null;
  }
}
