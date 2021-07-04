import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SwapiComponent} from "./swapi.component";

const routes: Routes = [
  {
    path: '', component: SwapiComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwapiRoutingModule {
}
