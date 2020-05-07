import { Component } from '@angular/core';
import { RouterOutlet, Data } from '@angular/router';
import { customTransition } from './router.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [customTransition ],
})

export class AppComponent {
  title = 'ngx-shop-client';
  public getRouterState(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }
}
