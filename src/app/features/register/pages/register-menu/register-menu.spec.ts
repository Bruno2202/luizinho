import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMenu } from './register-menu';

describe('RegisterMenu', () => {
  let component: RegisterMenu;
  let fixture: ComponentFixture<RegisterMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
