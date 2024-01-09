import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LatLng } from 'leaflet';
import { MapPin, MarkerDetails } from 'src/app/models/map-pin.interface';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  @Input() latLng: LatLng = new LatLng(0, 0);

  get addingMarkerLocked(): boolean {
    return this.mapService.addingMarkerLocked;
  }

  constructor(private readonly mapService: MapService) {}
  formGroup = new FormGroup({
    name: new FormControl(''),
    freq: new FormControl(''),
    radio: new FormControl(''),
  });

  onAddMarker() {
    const myMarkerData = this.formGroup.getRawValue() as MarkerDetails;

    const markerData: MapPin = {
      lat: this.mapService.myMarkerLat,
      lang: this.mapService.myMarkerLang,
      markerDetails: this.formGroup.getRawValue() as MarkerDetails,
    };

    this.mapService.addMyMarker(markerData);
  }

  onUpdateMarker() {
    const markerData: MapPin = {
      lat: this.mapService.myMarkerLat,
      lang: this.mapService.myMarkerLang,
      markerDetails: this.formGroup.getRawValue() as MarkerDetails,
    };
    this.mapService.updateMyMarker(markerData);
  }
}
