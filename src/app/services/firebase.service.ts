import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MapPin } from '../models/map-pin.interface';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  setData(data: MapPin): void {
    // this.db.object('pins').set(data)
    // this.db.object('pins').valueChanges()
  }

  getData() {
    // const databaseRef = this.db.database.ref('pins');
    // databaseRef.on('value', this.onValueCallback)
  }

  onValueCallback(snapshot: any) {
    console.log(snapshot.val());
  }

  closeStream() {
    console.log('onClose');

    const databaseRef = this.db.database.ref('pins');
    databaseRef.off('value', this.onValueCallback)
    this.db.database.goOffline();
  }
}
