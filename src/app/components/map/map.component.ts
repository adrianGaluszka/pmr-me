import { AfterViewInit, Component, OnInit } from '@angular/core';
import { log } from 'console';
import * as L from 'leaflet';
import { MapPin } from 'src/app/models/map-pin.interface';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  get markerLang(): number {
    return this.mapService.myMarkerLang;
  }

  get markerLat(): number {
    return this.mapService.myMarkerLat;
  }

  get addingMarkerLocked(): boolean {
    return this.mapService.addingMarkerLocked;
  }

  constructor(private readonly mapService: MapService){}

   ngAfterViewInit(): void {
    this.mapService.initMap();
   }
}
