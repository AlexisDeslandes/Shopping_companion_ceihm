import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricalsPage } from './historicals';

@NgModule({
  declarations: [
    HistoricalsPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricalsPage),
  ],
})
export class HistoricalsPageModule {}
