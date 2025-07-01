import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtDireccionComponent } from './ext-direccion.component';

describe('ExtDireccionComponent', () => {
  let component: ExtDireccionComponent;
  let fixture: ComponentFixture<ExtDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtDireccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
