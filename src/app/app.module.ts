import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CommunicationHistoryComponent } from './components/communication-history/communication-history.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmationsComponent } from './components/confirmations/confirmations.component';
import { InformationsComponent } from './components/informations/informations.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomMapPopupComponent } from './components/map/additional-components/custom-map-popup/custom-map-popup.component';
import { ConfirmConnectionInitializationComponent } from './components/map/additional-components/confirm-connection-initialization/confirm-connection-initialization.component';
import { MatBadgeModule } from '@angular/material/badge';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UserFormComponent,
    HeaderComponent,
    CommunicationHistoryComponent,
    AccountSettingsComponent,
    HomepageComponent,
    ConfirmationsComponent,
    InformationsComponent,
    CustomMapPopupComponent,
    ConfirmConnectionInitializationComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //CHECK IF NECESSERY
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatBadgeModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomMapPopupComponent],
})
export class AppModule {}
