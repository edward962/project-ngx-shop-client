import { NgModule, ModuleWithProviders } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, SharedModule],
  exports: [ModalComponent],
})
export class ModalModule {
  public static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [ModalService],
    };
  }
}
