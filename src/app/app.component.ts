import { Component } from '@angular/core';
import { RouterOutlet, Data } from '@angular/router';
import { customTransition } from './router.animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [customTransition ],
})

export class AppComponent {
  public getRouterState(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }
}
