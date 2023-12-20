import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationHistoryComponent } from './components/communication-history/communication-history.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'historia-lacznosci', component: CommunicationHistoryComponent },
  { path: 'konto', component: AccountSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
