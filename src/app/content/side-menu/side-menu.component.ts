import { Component, Input } from '@angular/core';
import { ICategory } from './interfaces/category.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass'],
})
export class SideMenuComponent {
  public show: string;
  public currentIndex: number | null = null;
  @Input() public categories!: ICategory[];
  hover(index: number) {
    this.currentIndex = index;
  }
  unHover() {
    this.currentIndex = null;
  }
}
