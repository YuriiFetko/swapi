import {Component, OnDestroy, OnInit} from '@angular/core';
import {Planet} from "../shared/interfaces/planet";
import {SwapiService} from "../shared/services/swapi.service";
import {LoadingService} from "../shared/services/loading.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../shared/components/modal/modal.component";
import {SubscriptionLike} from "rxjs";

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.sass']
})
export class InfoTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['Name', 'Diameter', 'Climate', 'Population'];
  public infoPlanetRow: Planet[] = [];
  public isLoadPlanet = false;
  public loading$ = this.loader.loading$;

  private subscriptions: SubscriptionLike[] = [];

  constructor(private swapiService: SwapiService,
              public dialog: MatDialog,
              public loader: LoadingService) {
  }

  ngOnInit(): void {
    this.getInfoPlanet();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  getInfoPlanet() {
    this.subscriptions.push(
      this.swapiService.infoPlanetSubject
        .subscribe((planet: Planet) => {
          this.isLoadPlanet = true;
          this.loader.show();
          this.infoPlanetRow = [planet];
        })
    );
  }

  onSelectUsers(urlPeople) {
    const firstUrl = urlPeople.length !== 0 ? urlPeople[0] : [];
    const dialogRef = this.dialog.open(ModalComponent, {
      data: firstUrl
    });
  }

}
