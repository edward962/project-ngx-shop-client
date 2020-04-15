import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass'],
})
export class SideMenuComponent implements OnInit {
  public show: string;
  public currentIndex: number| null = null;
  public cats = [
    { name: 'Camera & Photo', subCategories: [{ name: '1' }, { name: '2' }] },
    { name: 'Home Cinema, TV & Video', subCategories: [{ name: '1' }, { name: '2' }] },
    { name: 'Mobile Phones', subCategories: [{ name: '1' }, { name: '2' }] },
    { name: 'Computers & Components', subCategories: [{ name: '1' }, { name: '2' }] },
  ];

  hover(index: number) {
    this.currentIndex = index;
  }
  unHover() {
  this.currentIndex = null;
  }
  constructor() {}

  ngOnInit(): void {}
}
