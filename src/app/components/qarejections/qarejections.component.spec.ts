import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QarejectionsComponent } from './qarejections.component';

describe('QarejectionsComponent', () => {
  let component: QarejectionsComponent;
  let fixture: ComponentFixture<QarejectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QarejectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QarejectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
