import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QapoolComponent } from './qapool.component';

describe('QapoolComponent', () => {
  let component: QapoolComponent;
  let fixture: ComponentFixture<QapoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QapoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QapoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
