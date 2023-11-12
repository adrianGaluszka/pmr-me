import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LatLng } from 'leaflet';
import { MapPin } from 'src/app/models/map-pin.interface';
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
  surname = new FormControl('');

  onAddMarker() {
    this.mapService.addMyMarker();
  }

  onUpdateMarker() {

    const markerData: MapPin = {
      lat: this.mapService.myMarkerLat,
      lang: this.mapService.myMarkerLang,
      // id: this.mapService.myMarkerId
    }
    this.mapService.updateMyMarker(markerData);
  }

  refresh() {
    this.mapService.refteshMarkers();
  }

}
