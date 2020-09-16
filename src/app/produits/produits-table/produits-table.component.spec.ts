import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsTableComponent } from './produits-table.component';

describe('ProduitsTableComponent', () => {
  let component: ProduitsTableComponent;
  let fixture: ComponentFixture<ProduitsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduitsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
