import { Component } from '@angular/core';
import { WebsocketStateService } from './services/websocket-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pmr-me';

  constructor(private readonly websocketSate: WebsocketStateService) {
    this.websocketSate.runAllListeners();
  }
}
