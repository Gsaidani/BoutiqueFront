import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProduitModaleComponent } from './modify-produit-modale.component';

describe('ModifyProduitModaleComponent', () => {
  let component: ModifyProduitModaleComponent;
  let fixture: ComponentFixture<ModifyProduitModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProduitModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProduitModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
