import { Component, OnDestroy } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'pmr-me';

  constructor( private firebase: FirebaseService){}

  ngOnDestroy(): void {
      this.firebase.closeStream();
  }

  end() {
    this.firebase.closeStream();
  }
}
