import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcInteresadoContactoComponent } from './lc-interesado-contacto.component';

describe('LcInteresadoContactoComponent', () => {
  let component: LcInteresadoContactoComponent;
  let fixture: ComponentFixture<LcInteresadoContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LcInteresadoContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcInteresadoContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
