import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CreateComponent } from './crud/create/create.component';
import { DetailsComponent } from './crud/details/details.component';
import { HomeComponent } from './crud/home/home.component';
import { UpdateComponent } from './crud/update/update.component';

import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule } from '@angular/material/core';
import {MaterialExampleModule} from './material.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [
  { path: '', redirectTo: 'crud/home', pathMatch: 'full'},
  { path: 'crud/home', component: HomeComponent },
  { path: 'crud/details/:id', component: DetailsComponent },
  { path: 'crud/create', component: CreateComponent},
  { path: 'crud/update/:id', component: UpdateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    CreateComponent,
    UpdateComponent,
  ],
  imports: [
    MdbCheckboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
