import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredioCopropiedadComponent } from './predio-copropiedad.component';

describe('PredioCopropiedadComponent', () => {
  let component: PredioCopropiedadComponent;
  let fixture: ComponentFixture<PredioCopropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredioCopropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredioCopropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
