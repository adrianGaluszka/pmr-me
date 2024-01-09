import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Confirmation } from '../models/confirmation.interface';
import { io } from 'socket.io-client';
import { MapPin } from '../models/map-pin.interface';

@Injectable({
  providedIn: 'root',
})
export class WebsocketStateService {
  socket = io('http://localhost:3000', {
    // to declare in environemts
    transports: ['websocket'],
  });

  private _confirmations = new BehaviorSubject<Confirmation[]>([]);
  private _mapPins = new BehaviorSubject<MapPin[]>([]);
  $confirmationsValueChanges = this._confirmations.asObservable();
  $mapPinsValueChanges = this._mapPins.asObservable();
  websocketId!: string;
  constructor() {}

  runAllListeners(): void {
    this.socket.on('connect', () => {
      this.websocketId = this.socket.id;
    });
    this.socket.on('mapPinsValueChanges', (val) => {
      console.log('NEW PINS LIST: ');

      console.log(val);
      this._mapPins.next(val);
    });

    this.socket.on('notificationsValueChanges', (val) => {
      this._confirmations.next(val);
    });

    this.socket.on('debuggerHandleConnection', (val) => {
      console.log('DEBUGGER-HANDLE-CONNECTION: ');
      console.log(val);
      console.log('--------------------------------');
    });

    this.socket.on('debuggerHandleDisconnect', (val) => {
      console.log('DEBUGGER-HANDLE-DISCONNECT: ');
      console.log(val);
      console.log('--------------------------------');
    });
  }

  emitValue<T>(streamName: string, data: T): void {
    this.socket.emit(streamName, data);
  }
}
