
import { Component } from '@angular/core';
import { RouterOutlet, Data, Router, NavigationEnd } from '@angular/router';
import { customTransition } from './router.animation';


@Component({
  selector: 'ngx-shop-root',
  templateUrl: './app.component.html',
  animations: [customTransition],
})

export class AppComponent {
  constructor(private router: Router) { }
  public getRouterState(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }
  ngOnInit(){
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
}
