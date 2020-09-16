import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserModaleComponent } from './new-user-modale.component';

describe('NewUserModaleComponent', () => {
  let component: NewUserModaleComponent;
  let fixture: ComponentFixture<NewUserModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserModaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
