import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartInput } from './smart-input';

describe('SmartInput', () => {
  let component: SmartInput;
  let fixture: ComponentFixture<SmartInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
