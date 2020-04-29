import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent{
  @Output() queryBrands = new EventEmitter();
  public form: any;
  @Input() brands: string[] | undefined;
  public isShow = false;
  public brandsToShow: string[] = [];
  public check(brandName: string){
    const index = this.brandsToShow.indexOf(brandName);
    if (index === -1){
      this.brandsToShow.push(brandName);
      this.queryBrands.emit(this.brandsToShow);
    } else {
      this.brandsToShow.splice(index, 1);
      this.queryBrands.emit(this.brandsToShow);
    }
  }
  public show(){
    this.isShow = !this.isShow;
  }
}
