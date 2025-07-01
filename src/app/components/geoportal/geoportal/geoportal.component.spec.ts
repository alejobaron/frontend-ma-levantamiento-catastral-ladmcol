import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoportalComponent } from './geoportal.component';

describe('GeoportalComponent', () => {
  let component: GeoportalComponent;
  let fixture: ComponentFixture<GeoportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoportalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
