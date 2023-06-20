import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaeditComponent } from './qaedit.component';

describe('QaeditComponent', () => {
  let component: QaeditComponent;
  let fixture: ComponentFixture<QaeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QaeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
