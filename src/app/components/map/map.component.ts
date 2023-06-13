import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapPin } from 'src/app/models/map-pin.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map: any;

   ngAfterViewInit(): void {
    this.initMap();
   }

   updateMap(pins: MapPin[]) {
    const icon = {
      icon: L.icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 0 ],
        iconUrl: 'marker-icon.png',
     })
    }
    L.marker([ 51.9189046, 19.1343786], icon).addTo(this.map);
   }

   private initMap() {
    this.map = L.map('map', {
      center: [ 51.9189046, 19.1343786 ],
      zoom: 6
  });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
}
}
