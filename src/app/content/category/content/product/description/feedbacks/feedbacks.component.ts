import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../../../../../store/reducers';
import { ModalService } from 'src/app/modal/modal.service';
import { IFeedback } from '../../store/reducers/product.reducer';
import { createFeedbackPending } from '../../store/actions/product.actions';

@Component({
  selector: 'ngx-shop-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.sass'],
})
export class FeedbacksComponent {

  @Input()
  public feedbacks!: IFeedback[];


  constructor(
    private store: Store<IStore>,
    private  _modalService: ModalService,
  ) {
  }
  public async addFeedback(): Promise<void> {
    const component = await import(
      './addFeedback/add-feedback.component'
    );
    this._modalService.open({
      component: component.AddFeedbackComponent,
      context: {
        save: (value: IFeedback) => {
          this.store.dispatch(
            createFeedbackPending({
              feedback: { ...value },
            }),
          );
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
    
  }
}

