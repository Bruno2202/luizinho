import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandRegister } from './brand-register';

describe('BrandRegister', () => {
  let component: BrandRegister;
  let fixture: ComponentFixture<BrandRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
