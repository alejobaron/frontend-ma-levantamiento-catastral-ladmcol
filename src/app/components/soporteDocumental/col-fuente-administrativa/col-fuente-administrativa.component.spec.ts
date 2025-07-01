import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColFuenteAdministrativaComponent } from './col-fuente-administrativa.component';

describe('ColFuenteAdministrativaComponent', () => {
  let component: ColFuenteAdministrativaComponent;
  let fixture: ComponentFixture<ColFuenteAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColFuenteAdministrativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColFuenteAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
