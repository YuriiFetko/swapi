import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SwapiService} from "../../services/swapi.service";
import {Person} from "../../interfaces/person";
import {LoadingService} from "../../services/loading.service";
import {SubscriptionLike} from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['Name', 'Height', 'Birth year'];
  public infoPersonRow: Person[] = [];
  public isLoadPerson = false;

  private subscriptions: SubscriptionLike[] = [];

  constructor(private swapiService: SwapiService,
              public loader: LoadingService,
              public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: object) {
  }

  ngOnInit(): void {
    this.getInfoPeople(this.dialogRef.componentInstance.data)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getInfoPeople(url) {
    this.subscriptions.push(
      this.swapiService.getInfoPerson(url)
        .subscribe((person: Person) => {
          this.loader.show()
          this.isLoadPerson = true;
          this.infoPersonRow = [person];
        })
    );
  }
}
