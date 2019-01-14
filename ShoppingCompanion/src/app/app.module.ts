import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddShoppingListPageModule} from "../pages/add-shopping-list/add-shopping-list.module";
import { ArticleProvider } from '../providers/article/article';
import { ShoppingProvider } from '../providers/shopping/shopping';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SaveShoppingListPageModule} from "../pages/save-shopping-list/save-shopping-list.module";
import {IonicStorageModule} from "@ionic/storage";
import {ConsultShoppingListPageModule} from "../pages/consult-shopping-list/consult-shopping-list.module";
import {FavoritePageModule} from "../pages/favorite/favorite.module";
import {HistoricalsPageModule} from "../pages/historicals/historicals.module";
import {SearchPageModule} from "../pages/search/search.module";
import {PriorisationPageModule} from "../pages/priorisation/priorisation.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SaveShoppingListPageModule,
    AddShoppingListPageModule,
    ConsultShoppingListPageModule,
    FavoritePageModule,
    HistoricalsPageModule,
    SearchPageModule,
    PriorisationPageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ArticleProvider,
    ShoppingProvider,
    HttpClientModule
  ]
})
export class AppModule {}
