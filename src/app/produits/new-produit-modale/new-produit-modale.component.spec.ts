import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProduitModaleComponent } from './new-produit-modale.component';

describe('NewProduitModaleComponent', () => {
  let component: NewProduitModaleComponent;
  let fixture: ComponentFixture<NewProduitModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProduitModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProduitModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
