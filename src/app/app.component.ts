
import { Component } from '@angular/core';
import { RouterOutlet, Data } from '@angular/router';
import { customTransition } from './router.animation';


@Component({
  selector: 'ngx-shop-root',
  templateUrl: './app.component.html',
  animations: [customTransition],
})

export class AppComponent {
  public welcomeTxt: string = `Welcome to party!`;
  public getRouterState(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }
}
