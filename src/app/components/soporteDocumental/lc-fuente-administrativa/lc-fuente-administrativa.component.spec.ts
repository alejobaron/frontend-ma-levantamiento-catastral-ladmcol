import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcFuenteAdministrativaComponent } from './lc-fuente-administrativa.component';

describe('LcFuenteAdministrativaComponent', () => {
  let component: LcFuenteAdministrativaComponent;
  let fixture: ComponentFixture<LcFuenteAdministrativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LcFuenteAdministrativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcFuenteAdministrativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
