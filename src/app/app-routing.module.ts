import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationHistoryComponent } from './components/communication-history/communication-history.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ConfirmationsComponent } from './components/confirmations/confirmations.component';
import { InformationsComponent } from './components/informations/informations.component';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'potwierdzenia', component: ConfirmationsComponent },
  { path: 'informacje', component: InformationsComponent },
  { path: 'historia-lacznosci', component: CommunicationHistoryComponent },
  { path: 'konto', component: AccountSettingsComponent },
  {
    path: 'logowanie',
    component: LoginPageComponent,
    data: { pageMode: 'login' },
  },
  {
    path: 'rejestracja',
    component: LoginPageComponent,
    data: { pageMode: 'register' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
