import {NgModule} from "@angular/core";

import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  imports: [
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  exports: [
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatSnackBarModule,
    MatTabsModule
  ]
})
export class MaterialModule {}
