import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Drive } from './drive';

describe('Drive', () => {
  let component: Drive;
  let fixture: ComponentFixture<Drive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Drive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Drive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
