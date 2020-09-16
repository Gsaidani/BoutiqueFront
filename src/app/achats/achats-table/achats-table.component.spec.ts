import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatsTableComponent } from './achats-table.component';

describe('AchatsTableComponent', () => {
  let component: AchatsTableComponent;
  let fixture: ComponentFixture<AchatsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
