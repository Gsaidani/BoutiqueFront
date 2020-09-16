import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVenteModaleComponent } from './new-vente-modale.component';

describe('NewVenteModaleComponent', () => {
  let component: NewVenteModaleComponent;
  let fixture: ComponentFixture<NewVenteModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVenteModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVenteModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
