import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  public products;
  constructor() {
    this.products = [1, 2, 3, 4, 5, 6];
  }

  ngOnInit(): void {}
}
