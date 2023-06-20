import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QapendingComponent } from './qapending.component';

describe('QapendingComponent', () => {
  let component: QapendingComponent;
  let fixture: ComponentFixture<QapendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QapendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QapendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
