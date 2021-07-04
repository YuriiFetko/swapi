import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, pluck} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";
import {Planet} from "../interfaces/planet";

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  public infoPlanetSubject: Subject<Planet> = new Subject<Planet>();


  constructor(private http: HttpClient) {
  }

  getAllPlanets(): Observable<Planet[]> {
    return this.http.get<any>(`${environment.spawiApi}/api/planets`)
      .pipe(
        pluck('results'),
        catchError(() => {
          return of([]);
        })
      )
  }

  getInfoPlanet(url: string) {
    return this.http.get(url)
      .pipe(
        catchError(() => {
          return of([]);
        })
      )
  }

  getInfoPerson(url) {
    return this.http.get(url)
      .pipe(
        catchError(() => {
          return of([]);
        })
      )
  }
}
