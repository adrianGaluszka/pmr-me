import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Confirmation } from 'src/app/models/confirmation.interface';
import { MapPin } from 'src/app/models/map-pin.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-connection-initialization',
  templateUrl: './confirm-connection-initialization.component.html',
  styleUrls: ['./confirm-connection-initialization.component.scss'],
})
export class ConfirmConnectionInitializationComponent {
  mapPinData: MapPin;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MapPin,
    public dialogRef: MatDialogRef<ConfirmConnectionInitializationComponent>,
    private http: HttpClient
  ) {
    this.mapPinData = data;
  }

  onConfirm(): void {
    console.log('CONFIRMED');
    const confirmationData: Confirmation = {
      id: this.mapPinData.id!,
      date: new Date().getDate().toString(),
      name: this.mapPinData.markerDetails.name,
      radio: this.mapPinData.markerDetails.radio,
      localization: 'asd',
    };
    this.http
      .post(environment.api + 'confirmations', confirmationData)
      .subscribe((res) => {
        console.log(res);
      });
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
