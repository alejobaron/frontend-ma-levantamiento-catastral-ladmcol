import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadAdministrativaBasicaComponent } from './unidad-administrativa-basica.component';

describe('UnidadAdministrativaBasicaComponent', () => {
  let component: UnidadAdministrativaBasicaComponent;
  let fixture: ComponentFixture<UnidadAdministrativaBasicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadAdministrativaBasicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadAdministrativaBasicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
