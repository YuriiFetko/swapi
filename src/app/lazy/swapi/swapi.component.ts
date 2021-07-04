import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwapiService} from "./shared/services/swapi.service";
import {Planet} from "./shared/interfaces/planet";
import {LoadingService} from "./shared/services/loading.service";
import {SubscriptionLike} from "rxjs";

@Component({
  selector: 'app-swapi',
  templateUrl: './swapi.component.html',
  styleUrls: ['./swapi.component.sass']
})
export class SwapiComponent implements OnInit, OnDestroy {

  public allPlanets: Planet[];
  public planetInfo: Planet;
  public onLoad = false;

  private _previousPlanet: string;
  private subscriptions: SubscriptionLike[] = [];

  constructor(private swapiService: SwapiService,
              public loader: LoadingService) {
    this.loader.show();
  }

  ngOnInit(): void {
    this.onGetAllPlanets();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  onGetAllPlanets() {
    this.subscriptions.push(
      this.swapiService.getAllPlanets()
        .subscribe((planets: Planet[]) => {
          this.onLoad = true;
          this.allPlanets = planets;
        })
    )
  }

  onSelectPlanet(planet: Planet) {
    if (planet.url === this._previousPlanet) {
      return;
    }
    this._previousPlanet = planet.url;
    this.loader.hide();

    this.subscriptions.push(
      this.swapiService.getInfoPlanet(planet.url)
        .subscribe((infoPlanet: Planet) => {
          this.loader.show();
          this.swapiService.infoPlanetSubject.next(infoPlanet);
          this.planetInfo = infoPlanet;
        })
    );
  }

}
