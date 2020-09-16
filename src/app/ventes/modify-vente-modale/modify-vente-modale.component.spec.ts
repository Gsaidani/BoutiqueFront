import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyVenteModaleComponent } from './modify-vente-modale.component';

describe('ModifyVenteModaleComponent', () => {
  let component: ModifyVenteModaleComponent;
  let fixture: ComponentFixture<ModifyVenteModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyVenteModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyVenteModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
