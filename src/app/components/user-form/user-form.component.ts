import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LatLng } from 'leaflet';
import { MapPin, MarkerDetails } from 'src/app/models/map-pin.interface';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  @Input() latLng: LatLng = new LatLng(0, 0);

  get addingMarkerLocked(): boolean {
    return this.mapService.addingMarkerLocked;
  }

  constructor(private readonly mapService: MapService){}

    name = new FormControl('');
    freq = new FormControl('');
    radioDetails = new FormControl('')



  onAddMarker() {
    const myMarkerData: MarkerDetails = {
      name: this.name.getRawValue() as string,
      freq: this.freq.getRawValue() as string,
      radioDetails: this.radioDetails.getRawValue() as string
    }

    this.mapService.addMyMarker(myMarkerData);
  }

  onUpdateMarker() {

    const markerData: MapPin = {
      lat: this.mapService.myMarkerLat,
      lang: this.mapService.myMarkerLang,
    }
    this.mapService.updateMyMarker(markerData);
  }
}
