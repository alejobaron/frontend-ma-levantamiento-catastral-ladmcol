import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrInteresadoComponent } from './cr-interesado.component';

describe('CrInteresadoComponent', () => {
  let component: CrInteresadoComponent;
  let fixture: ComponentFixture<CrInteresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrInteresadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrInteresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
