import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmConnectionInitializationComponent } from './confirm-connection-initialization.component';

describe('ConfirmConnectionInitializationComponent', () => {
  let component: ConfirmConnectionInitializationComponent;
  let fixture: ComponentFixture<ConfirmConnectionInitializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmConnectionInitializationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmConnectionInitializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
