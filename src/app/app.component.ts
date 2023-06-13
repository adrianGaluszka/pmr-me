import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pmr-me';

  constructor( private firebase: FirebaseService){}

  ngOnInit(): void {
      this.firebase.getData();
  }

  ngOnDestroy(): void {
      this.firebase.closeStream();
  }

  cl() {
    // this.firebase.setData();
  }

  end() {
    this.firebase.closeStream();
  }
}
