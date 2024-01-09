import { Component } from '@angular/core';
import { map } from 'rxjs';
import { WebsocketStateService } from 'src/app/services/websocket-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMenu = false;
  notificationsCount = this.websocketState.$confirmationsValueChanges.pipe(
    map((items) => items.length)
  );

  constructor(private readonly websocketState: WebsocketStateService) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
