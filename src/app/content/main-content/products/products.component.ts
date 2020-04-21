import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ){}
  id: any;


  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('this.id ', this.id);
  }
}
