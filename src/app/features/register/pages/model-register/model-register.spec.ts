import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRegister } from './model-register';

describe('ModelRegister', () => {
  let component: ModelRegister;
  let fixture: ComponentFixture<ModelRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
