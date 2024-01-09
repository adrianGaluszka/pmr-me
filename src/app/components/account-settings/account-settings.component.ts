import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    radio: new FormControl(''),
    description: new FormControl(''),
    localization: new FormControl(''),
  });
}
