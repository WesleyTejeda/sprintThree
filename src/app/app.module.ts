import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FundsComponent } from './funds/funds.component';
import { FundComponent } from './fund/fund.component';

@NgModule({
  declarations: [
    AppComponent,
    FundsComponent,
    FundComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
