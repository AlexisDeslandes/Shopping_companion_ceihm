import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultShoppingListPage } from './consult-shopping-list';

@NgModule({
  declarations: [
    ConsultShoppingListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultShoppingListPage),
  ],
})
export class ConsultShoppingListPageModule {}
