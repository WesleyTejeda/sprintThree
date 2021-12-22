import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FundsComponent } from './funds/funds.component';
import { FundComponent } from './fund/fund.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EditFundComponent } from './edit-fund/edit-fund.component';
import { FormsModule } from '@angular/forms';
import { CreateFundComponent } from './create-fund/create-fund.component';

const routes: Routes = [
  {path: "", component: FundsComponent},
  {path: "funds", component: FundsComponent},
  {path: "funds/create", component: CreateFundComponent},
  {path: "funds/:id", component: FundComponent},
  {path: "funds/:id/edit", component: EditFundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FundsComponent,
    FundComponent,
    EditFundComponent,
    CreateFundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
