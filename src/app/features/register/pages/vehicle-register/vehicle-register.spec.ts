import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegister } from './vehicle-register';

describe('VehicleRegister', () => {
  let component: VehicleRegister;
  let fixture: ComponentFixture<VehicleRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
