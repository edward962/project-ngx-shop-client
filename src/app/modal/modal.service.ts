import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
interface IModalData {
  // tslint:disable-next-line:no-any
  component: Type<any>;
  context: object;
}
@Injectable()
export class ModalService {
  // tslint:disable-next-line:no-any
  private _modalSequence$$: Subject<any> = new Subject();

  public open(componentObj: IModalData): void {
    this._modalSequence$$.next(componentObj);
  }

  public close(): void {
    this._modalSequence$$.next({});
  }

  public get modalSequence$(): Observable<IModalData> {
    return this._modalSequence$$.asObservable();
  }
}
