import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  isAuth: Observable<boolean>;

  constructor(
    private readonly websocketState: WebsocketStateService,
    private readonly authService: AuthService
  ) {
    this.isAuth = this.authService.isLoggedIn$;
    console.log(this.isAuth);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onLogout() {
    this.authService.logout();
  }
}
