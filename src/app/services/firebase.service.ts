import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MapPin } from '../models/map-pin.interface';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private refreshMarkers$ = new BehaviorSubject<MapPin[]>([]);
  private myMarkerId$ = new BehaviorSubject<string>('');
  private myMarkerId = '';

  private _dbRef;
  private _dbmarkersListRef;
  constructor(private db: AngularFireDatabase) {
    this._dbRef = this.db.database.ref('markers');
    this._dbmarkersListRef = this.db.list('markers');
  }

  get myMarkerIdValue$(): Observable<string> {
    return this.myMarkerId$.asObservable();
  }

  get refreshMarkers(): Observable<MapPin[]> {
    return this.refreshMarkers$.asObservable();
  }

  setData(data: MapPin): any {
    this._dbmarkersListRef.push(data).then(datas => {
      this.myMarkerId = datas.key as string;
      this.myMarkerId$.next(datas.key as string);
    });
    return null;
  }

  updateMyMarker(newPositionData: MapPin): void {
    // this.db.list('markers').update()
    this._dbmarkersListRef.update(this.myMarkerId, newPositionData);
  }

  getData() {
    console.log('getData');

    // const databaseRef = this.db.database.ref('markers');
    // this._dbRef.on('value', snapshot => {
    //   this.onValueCallback(snapshot)
    // })
  }

  onValueCallback(snapshot: any) {
    const dbResponse = snapshot.val() as MapPin[];
    if(!dbResponse) {
      return;
    }
    console.log(dbResponse);

    this.refreshMarkers$.next(dbResponse);
  }

  closeStream() {
    this._dbRef.off();
    this.db.database.goOffline();
    this
  }
}
