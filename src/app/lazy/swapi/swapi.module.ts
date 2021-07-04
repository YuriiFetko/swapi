import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/material/material.module";
import {SwapiRoutingModule} from "./swapi-routing.module";
import {SwapiService} from "./shared/services/swapi.service";

import {SwapiComponent} from './swapi.component';
import {InfoTableComponent} from './info-table/info-table.component';
import {ModalComponent} from './shared/components/modal/modal.component';


@NgModule({
  declarations: [
    SwapiComponent,
    InfoTableComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    SwapiRoutingModule,
    MaterialModule
  ],
  providers: [SwapiService],
  entryComponents: [
    ModalComponent
  ]
})
export class SwapiModule {
}
