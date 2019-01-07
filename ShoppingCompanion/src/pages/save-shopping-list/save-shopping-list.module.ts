import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveShoppingListPage } from './save-shopping-list';

@NgModule({
  declarations: [
    SaveShoppingListPage,
  ],
  imports: [
    IonicPageModule.forChild(SaveShoppingListPage),
  ],
})
export class SaveShoppingListPageModule {}
