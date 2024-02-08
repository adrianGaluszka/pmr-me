import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { WebsocketStateService } from './services/websocket-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pmr-me';

  constructor(
    private readonly websocketSate: WebsocketStateService,
    private readonly authService: AuthService
  ) {
    this.websocketSate.runAllListeners();
    this.authService.initAuth();
  }
}
