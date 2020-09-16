import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserModaleComponent } from './modify-user-modale.component';

describe('ModifyUserModaleComponent', () => {
  let component: ModifyUserModaleComponent;
  let fixture: ComponentFixture<ModifyUserModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyUserModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUserModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
