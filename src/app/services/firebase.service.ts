import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MapPin } from '../models/map-pin.interface';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataSnapshot } from '@angular/fire/compat/database/interfaces';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  myMarkerId = '';
  private myMarker: MapPin = {lat: 0, lang: 0};
  private _refreshMarkers$ = new Subject<MapPin[]>;
  private _autoRefreshLocked = false;
  private _data: MapPin[] = [];
  private _dbRef;
  private _dbmarkersListRef;

  constructor(private db: AngularFireDatabase) {
    this._dbRef = this.db.database.ref('markers');
    this._dbmarkersListRef = this.db.list('markers');
  }

  get refreshMarkers$(): Observable<MapPin[]> {
    return this._refreshMarkers$.asObservable();
  }

  setData(data: MapPin): void {
    this._autoRefreshLocked = true;
    this._dbmarkersListRef.push(data).then(datas => {

      this.myMarker = {
        ...data,
        objectId: datas.key as string
      }
      console.log(this.myMarkerId);
      this._autoRefreshLocked = false;
      this._refreshMarkers$.next(this._data);
    });
  }

  updateMyMarker(newPositionData: MapPin): void {
    this._dbmarkersListRef.update(this.myMarker.objectId as string, newPositionData);
  }

  initValueChangesListener(): void {
    this._dbRef.on('value', snapshot => {
      if(!snapshot) {
        return;
      }
      this._data = this.firebaseDataMapper(snapshot) as MapPin[];
      if (this._autoRefreshLocked) {
        return;
      }
      console.log(this.myMarkerId);
      this._refreshMarkers$.next(this.firebaseDataMapper(snapshot) as MapPin[]);
      console.log('Change in db detected');

    })
  }

  closeStream() {
    this._dbRef.off();
    this.db.database.goOffline();
  }

  private firebaseDataMapper(data: DataSnapshot): MapPin[] {
    const dataObj = data.val();
    if (!dataObj) {
      return [];
    }
    return Object.keys(dataObj).map(item => {
      return {
        objectId: item,
        ...dataObj[item]
      };
    });
  }
}
