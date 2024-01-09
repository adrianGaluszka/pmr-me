import { AfterViewInit, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapPin, MarkerDetails } from 'src/app/models/map-pin.interface';
import { ConfirmConnectionInitializationComponent } from '../confirm-connection-initialization/confirm-connection-initialization.component';

@Component({
  selector: 'app-custom-map-popup',
  templateUrl: './custom-map-popup.component.html',
  styleUrls: ['./custom-map-popup.component.scss'],
})
export class CustomMapPopupComponent implements AfterViewInit {
  @Input() mapPin!: MapPin;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    console.log(this.mapPin);
  }

  onInitializeConnection(): void {
    this.dialog.open(ConfirmConnectionInitializationComponent, {
      width: '350px',
      data: this.mapPin,
    });
  }
}
