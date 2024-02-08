import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email = '';
  password = '';
  confirmPassword = '';
  loginMode = true;
  @Input() data = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.loginMode = this.activatedRoute.snapshot.data['pageMode'] === 'login';
  }

  onRegister() {
    this.authService.signUp(this.email, this.password);
  }

  onLogin() {
    this.authService.login(this.email, this.password);
  }
}
