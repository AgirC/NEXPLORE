import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material components
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

//Pages
import { Duties } from "../shared/pages/duties/duties";

//components
import { Header } from "../shared/components/header/header";
import { Duty } from "../shared/components/duty/duty";
import { DutyDialog } from "../shared/components/dutyDialog/dialogDuty";
import { ModalConfirmComponent } from "../shared/components/modal-error/modal-confirm.component";

//Error intercerptor

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    Duties,
    Header,
    Duty,
    DutyDialog,
    ModalConfirmComponent
  ],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    GraphQLModule,
    MatInputModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  entryComponents: [
    DutyDialog,
    ModalConfirmComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
