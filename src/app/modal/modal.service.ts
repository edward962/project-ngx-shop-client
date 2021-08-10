import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface IModalData {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: Type<any>;
	context: object;
}
@Injectable()
export class ModalService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
