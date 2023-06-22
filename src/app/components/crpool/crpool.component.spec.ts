import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrpoolComponent } from './crpool.component';

describe('CrpoolComponent', () => {
  let component: CrpoolComponent;
  let fixture: ComponentFixture<CrpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrpoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
