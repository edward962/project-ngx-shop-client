import { Store } from '@ngrx/store';
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IStore } from 'src/app/store/reducers';
import { getProductsPending } from 'src/app/store/actions/products.actions';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IStore>,
    private el: ElementRef
  ){}
  public query: any;
  @Output() queryBrands = new EventEmitter();
  @Input() brands: string[] | undefined;
  public isShow = false;
  public brandsToShow: string[] = [];
  public checkedBrands: string[] = ['NAVITEL'];
  public getBrands(brands: any){
    this.activatedRoute.queryParams.subscribe(
      query => this.query = query);
    const brandsForQuery = brands.join(',');
    const  {id, name, value, highValue, productName} = this.query;
    if (brandsForQuery){
      this.router.navigate(['.'], { relativeTo: this.activatedRoute,
        queryParams: { id, name, value, highValue, productName, brandsForQuery }});
    }
  }
  public checked(brandName: string){
    const index = this.checkedBrands.indexOf(brandName);
    if (index === -1){
      return false;
    } else {
      return true;
    }
  }
  public check(brandName: string){
    const index = this.brandsToShow.indexOf(brandName);
    if (index === -1){
      this.brandsToShow.push(brandName);

    } else {
      this.brandsToShow.splice(index, 1);

    }
    this.getBrands(this.brandsToShow);
    return this.queryBrands.emit(this.brandsToShow);
  }
  public show(){
    this.isShow = !this.isShow;
  }

  public initialGetProducts(query: any){
    if (query.selectedBrands) {
    }
    const priceForRange = query.priceRange ? query.priceRange : '0,100000';
    const selectedForBrands = query.selectedBrands ? query.selectedBrands : '';
    const search = { id: query.id, priceRange: priceForRange, productName: query.name, selectedBrands: selectedForBrands} ;

    this.store.dispatch(getProductsPending(search));

  }
  public toggleTodo(brandName: string) {
    console.log(brandName);
    const el = document.getElementById(brandName);
    // this.el.nativeElement
    //   .dispatchEvent(new CustomEvent('', {
    //     bubbles: true
    //   }));



    console.log('foo');
    el?.dispatchEvent(new CustomEvent('click', {
      bubbles: false
    }), );
  }
  // ngOnChanges(){
  //    this.activatedRoute.queryParams.subscribe(
  //     query => this.query = query.brandsQuery);
  //    const data = this.query.split(',');
  //     // toggleTodo(this.query)
  // }
}

