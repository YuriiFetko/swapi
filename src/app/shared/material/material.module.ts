import {NgModule} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  exports: [
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class MaterialModule {
}
