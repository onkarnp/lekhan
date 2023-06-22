import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QatrackingComponent } from './qatracking.component';

describe('QatrackingComponent', () => {
  let component: QatrackingComponent;
  let fixture: ComponentFixture<QatrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QatrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QatrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
