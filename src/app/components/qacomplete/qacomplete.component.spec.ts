import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QacompleteComponent } from './qacomplete.component';

describe('QacompleteComponent', () => {
  let component: QacompleteComponent;
  let fixture: ComponentFixture<QacompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QacompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QacompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
