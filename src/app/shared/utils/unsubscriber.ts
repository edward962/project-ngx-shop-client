import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class UnSubscriber implements OnDestroy {
  protected unsubscribe$$ = new Subject();

  public ngOnDestroy(): void {
    this.unsubscribe$$.next(true);
    this.unsubscribe$$.complete();
  }
}
