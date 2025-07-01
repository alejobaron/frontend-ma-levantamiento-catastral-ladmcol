import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAdicionalesLevantamientoCatastralComponent } from './datos-adicionales-levantamiento-catastral.component';

describe('DatosAdicionalesLevantamientoCatastralComponent', () => {
  let component: DatosAdicionalesLevantamientoCatastralComponent;
  let fixture: ComponentFixture<DatosAdicionalesLevantamientoCatastralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosAdicionalesLevantamientoCatastralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosAdicionalesLevantamientoCatastralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
